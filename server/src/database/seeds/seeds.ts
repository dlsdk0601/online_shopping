import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Faker, faker } from "@faker-js/faker";
import { isNil } from "lodash";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import mime from "mime";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Manager, { ManagerType } from "../../entities/manager.entity";
import { getHash, hashSync } from "../../ex/bcryptEx";
import { User } from "../../entities/user.entity";
import { ProductCategory, PurchaseItemStatus, UserType } from "../../type/commonType";
import { LocalUser } from "../../entities/local-user.entity";
import { Subscribe } from "../../entities/subscribe.entity";
import { Product } from "../../entities/product.entity";
import { Asset } from "../../entities/asset.entity";
import { MainBanner } from "../../entities/main-banner.entity";
import { Cart, CartProduct } from "../../entities/cart.entity";
import { Purchase, PurchaseItem } from "../../entities/Purchase.entity";
import { makeOrderCode } from "../../ex/ex";
import { config } from "../../config";

export default class TypeOrmSeeder implements Seeder {
  s3 = new S3Client({
    credentials: {
      accessKeyId: config.awsAccessKey,
      secretAccessKey: config.awsSecretKey,
    },
    region: config.awsRegion,
  });

  mensImages = ["men-01.jpg", "men-02.jpg", "men-03.jpg"];
  womensImages = ["women-01.jpg", "women-02.jpg", "women-03.jpg"];
  kidsImages = ["kid-01.jpg", "kid-02.jpg", "kid-03.jpg"];
  accessoriesImages = ["accessories-01.png", "accessories-02.png", "accessories-03.jpg"];
  bannerImages = [
    "baner-right-image-01.jpg",
    "baner-right-image-02.jpg",
    "baner-right-image-03.jpg",
    "baner-right-image-04.jpg",
  ];

  async run(dataSource: DataSource): Promise<any> {
    console.log("----------------Faker Insert Start----------------");

    faker.locale = "ko";
    const importers: ((faker: Faker) => Promise<void>)[] = [
      // () => this.onAddAsset(faker),
      // () => this.onAddManager(faker),
      // () => this.onAddUser(faker),
      // () => this.onAddProduct(faker),
      () => this.onAddBanner(faker),
    ];
    // this.onAddBanner(faker),
    // this.onAddCart(faker),
    // this.onAddPurchase(faker),
    return this.runAsyncFunctionsSequentially(importers, faker).then(() => console.log("success"));
  }

  runAsyncFunctionsSequentially(importers: ((faker: Faker) => Promise<void>)[], faker: Faker) {
    return importers.reduce((prev, next) => {
      return prev.then(() => next(faker));
    }, Promise.resolve());
  }

  async onAddAsset(faker: Faker) {
    const assets: Asset[] = [];
    const temp = path.join(__dirname, "..", "..", "..", "src", "temp", "productImages");
    const files = fs.readdirSync(temp, { withFileTypes: true });
    for (let i = 0; i < files.length; i++) {
      const entry = files[i];
      if (!entry.isFile()) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const filePath = path.join(temp, entry.name);
      const file = fs.readFileSync(filePath);
      const fileBase64 = file.toString("base64");
      // eslint-disable-next-line no-await-in-loop
      const isUpload = await this.awsUpload(entry.name, fileBase64);

      if (!isUpload) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const asset = new Asset();
      asset.content_type = mime.lookup(filePath);
      asset.name = entry.name;
      asset.uuid = uuidv4().toString();
      asset.url = this.awsDownloadUrl(entry.name);
      asset.download_url = this.awsDownloadUrl(entry.name);

      assets.push(asset);
    }

    await Asset.save(assets);
  }

  async awsUpload(fileName: string, base64: string): Promise<boolean> {
    const command = new PutObjectCommand({
      Bucket: config.awsBucketName,
      Key: fileName,
      Body: Buffer.from(base64, "base64"),
      ContentType: "application/octet-stream",
    });

    try {
      const res = await this.s3.send(command);
      if (res.$metadata.httpStatusCode !== 200) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  awsDownloadUrl(fileName: string) {
    return `https://${config.awsBucketName}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
  }

  async onAddManager(faker: Faker) {
    const managers: Manager[] = [];

    for (let i = 0; i < 10; i++) {
      const manager = new Manager();
      manager.password_hash = hashSync(this.randomPassword(faker));
      manager.id = faker.datatype.uuid();
      manager.name = faker.name.fullName();
      manager.email = faker.internet.email();
      manager.type = ManagerType.MANAGER;
      managers.push(manager);
    }

    managers[0].id = "manager";
    managers[0].name = "manager";
    managers[0].email = "manager@test.com";
    managers[0].password_hash = await getHash("1234");

    await Manager.save(managers);
  }

  async onAddUser(faker: Faker) {
    const users: User[] = [];
    for (let i = 0; i < 120; i++) {
      const user = new User();
      const localUser = new LocalUser();

      user.name = faker.name.fullName();
      user.phone = this.makeFakerPhone(faker);
      user.type = UserType.LOCAL;

      localUser.id = faker.datatype.uuid();
      localUser.email = faker.internet.email();
      localUser.password_hash = hashSync(this.randomPassword(faker));
      user.localUser = localUser;

      users.push(user);
    }

    users[0].localUser.id = "test";
    users[0].localUser.password_hash = await getHash("1234");
    await User.save(users);
  }

  async onAddBanner(faker: Faker) {
    const newBanners: MainBanner[] = [];
    const categories = [
      {
        category: ProductCategory.WOMEN,
        asset: await Asset.findOne({ where: { name: this.bannerImages[0] } }),
      },
      {
        category: ProductCategory.MEN,
        asset: await Asset.findOne({ where: { name: this.bannerImages[1] } }),
      },
      {
        category: ProductCategory.KIDS,
        asset: await Asset.findOne({ where: { name: this.bannerImages[2] } }),
      },
      {
        category: ProductCategory.ACCESSORY,
        asset: await Asset.findOne({ where: { name: this.bannerImages[3] } }),
      },
    ];

    for (let i = 0; i < categories.length; i++) {
      const asset = categories[i].asset;
      if (isNil(asset)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const banner = new MainBanner();
      banner.image = asset;
      banner.category = categories[i].category;
      banner.title = faker.random.words(2);
      banner.sub_title = faker.random.words(4);
      banner.description =
        categories[i].category === ProductCategory.WOMEN ? null : faker.random.words(4);

      newBanners.push(banner);
    }
    await MainBanner.save(newBanners);
  }

  async onAddProduct(faker: Faker) {
    const newMensProducts = await this.productList(faker, ProductCategory.MEN);
    const newWomensProducts = await this.productList(faker, ProductCategory.WOMEN);
    const newKidsProducts = await this.productList(faker, ProductCategory.KIDS);
    const newAccessoryProducts = await this.productList(faker, ProductCategory.ACCESSORY);

    await Product.save([
      ...newMensProducts,
      ...newWomensProducts,
      ...newKidsProducts,
      ...newAccessoryProducts,
    ]);
  }

  async productList(faker: Faker, category: ProductCategory): Promise<Product[]> {
    const products: Product[] = [];

    let fileNames: string[];
    switch (category) {
      case ProductCategory.MEN:
        fileNames = this.mensImages;
        break;
      case ProductCategory.WOMEN:
        fileNames = this.womensImages;
        break;
      case ProductCategory.KIDS:
        fileNames = this.kidsImages;
        break;
      case ProductCategory.ACCESSORY:
      default:
        fileNames = this.accessoriesImages;
        break;
    }

    if (isNil(fileNames)) {
      return [];
    }

    const mainImage = await Asset.findOne({ where: { name: fileNames[0] } });
    if (isNil(mainImage)) {
      return [];
    }

    const subImages = await Asset.find({ where: fileNames.map((name) => ({ name })) });
    for (let i = 0; i < 20; i++) {
      const product = new Product();
      product.name = faker.name.fullName();
      product.description_title = faker.random.words(4);
      product.description = faker.random.words(50);
      product.price = Number(faker.random.numeric(3));
      product.main_image = mainImage;
      product.sub_images = subImages; // TODO :: 서브 이미지들이 안들어간다.
      product.category = category;
      product.stock_count = 10;
      products.push(product);
    }

    return products;
  }

  // TODO :: 여기서 부터 다시 시작
  async onAddCart(faker: Faker) {
    const oldCart = await Cart.find();
    await Cart.remove(oldCart);

    const carts = this.cartList(faker);
    const cartProduct: CartProduct[] = [];

    for (let i = 0; i < carts.length; i++) {
      const cartProductEntity = new CartProduct();
      // eslint-disable-next-line no-await-in-loop
      cartProductEntity.product = (await Product.findOne({
        where: { pk: carts[i].product_pk },
      })) as Product;
      cartProductEntity.count = carts[i].count;
      cartProduct.push(cartProductEntity);
    }

    await CartProduct.save(cartProduct);

    const user = await User.findOne({ where: { pk: 4090 } });
    const cart = new Cart();

    if (isNil(user)) {
      return;
    }

    cart.user = user;
    cart.cart_products = cartProduct;
    await cart.save();
  }

  async onAddPurchase(faker: Faker) {
    // const oldPurchase = await Purchase.find();
    // const oldPurchaseItems = await PurchaseItem.find();
    // await Purchase.remove(oldPurchase);
    // await PurchaseItem.remove(oldPurchaseItems);

    const purchases: Purchase[] = [];

    for (let i = 0; i < 5; i++) {
      const purchase = new Purchase();
      purchase.order_code = makeOrderCode();
      const userPk = faker.datatype.number({ min: 4091, max: 4209 });
      // eslint-disable-next-line no-await-in-loop
      purchase.user = (await User.findOneBy({
        pk: userPk,
      })) as User;
      // eslint-disable-next-line no-await-in-loop
      purchase.purchase_items = await this.purchaseItems(faker);
      purchases.push(purchase);
    }

    await Purchase.save(purchases);
  }

  async userList(faker: Faker) {
    for (let i = 0; i < 120; i++) {
      const user = new User();
      const localUser = new LocalUser();
      const subscribe = new Subscribe();

      user.name = faker.name.fullName();
      user.phone = this.makeFakerPhone(faker);
      user.type = UserType.LOCAL;
      // eslint-disable-next-line no-await-in-loop
      await user.save();

      subscribe.user = user;
      subscribe.email = faker.internet.email();
      subscribe.name = faker.name.fullName();
      // eslint-disable-next-line no-await-in-loop
      await subscribe.save();

      // eslint-disable-next-line no-await-in-loop
      const password_hash = await getHash(this.randomPassword(faker));
      localUser.id = faker.datatype.uuid();
      localUser.email = faker.internet.email();
      localUser.password_hash = password_hash;
      localUser.user = user;

      // localUsers.push(localUser);
    }

    // localUsers[0].id = "test";
    // localUsers[0].password_hash = await getHash("1234");

    // return localUsers;
  }

  cartList(faker: Faker) {
    const carts: Array<{ product_pk: number; count: number }> = [];

    for (let i = 0; i < 5; i++) {
      carts.push({
        product_pk: faker.datatype.number({ min: 86, max: 165 }),
        count: faker.datatype.number({ min: 2, max: 10 }),
      });
    }

    return carts;
  }

  async purchaseItems(faker: Faker) {
    const purchaseList: PurchaseItem[] = [];
    const maxPkProduct = await Product.find({
      order: {
        pk: "desc",
      },
    });

    const maxPk = maxPkProduct[0].pk;

    for (let i = 0; i < 6; i++) {
      const purchase = new PurchaseItem();
      purchase.status = PurchaseItemStatus.WAITING;
      purchase.count = faker.datatype.number({ min: 1, max: 3 });
      // eslint-disable-next-line no-await-in-loop
      purchase.product = (await Product.findOne({
        where: { pk: faker.datatype.number({ min: maxPk - 80, max: maxPk }) },
      })) as Product;
      purchaseList.push(purchase);
    }

    return purchaseList;
  }

  makeFakerPhone(faker: Faker) {
    const second = faker.datatype.number({ min: 1000, max: 9999 });
    const third = faker.datatype.number({ min: 1000, max: 9999 });
    return `010${second}${third}`;
  }

  randomPassword(faker: Faker) {
    return faker.datatype.number({ min: 1000, max: 9999 }).toString();
  }
}
