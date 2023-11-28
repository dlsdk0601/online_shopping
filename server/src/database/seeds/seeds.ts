import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Faker, faker } from "@faker-js/faker";
import { isNil, random } from "lodash";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import mime from "mime";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Manager, { ManagerType } from "../../entities/manager.entity";
import { getHash, hashSync } from "../../ex/bcryptEx";
import { User } from "../../entities/user.entity";
import { ProductCategory, UserType } from "../../type/commonType";
import { LocalUser } from "../../entities/local-user.entity";
import { Product } from "../../entities/product.entity";
import { Asset } from "../../entities/asset.entity";
import { MainBanner } from "../../entities/main-banner.entity";
import { Cart, CartProduct } from "../../entities/cart.entity";
import { config } from "../../config";
import { GoogleUser } from "../../entities/google-user.entity";
import { KakaoUser } from "../../entities/kakao-user.entity";
import { NaverUser } from "../../entities/naver-user.entity";

export default class TypeOrmSeeder implements Seeder {
  dataSource: DataSource | null = null;
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

  userTypes: UserType[] = [
    UserType.LOCAL,
    UserType.GOOGLE,
    UserType.APPLE,
    UserType.KAKAO,
    UserType.NAVER,
  ];

  async run(dataSource: DataSource): Promise<any> {
    this.dataSource = dataSource;

    console.log("----------------Faker Insert Start----------------");

    faker.locale = "ko";
    const importers: ((faker: Faker) => Promise<void>)[] = [
      // () => this.onAddAsset(faker),
      // () => this.onAddManager(faker),
      // () => this.onAddUser(faker),
      // () => this.onAddProduct(faker),
      // () => this.onAddBanner(faker),
      // () => this.onAddCart(faker),
      () => this.onAddCart(faker),
      () => this.onAddPurchase(faker),
    ];

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
      return res.$metadata.httpStatusCode === 200;
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

    // 테스트 계정
    const user = new User();
    const local = this.localUser(faker);
    user.name = faker.name.fullName();
    user.phone = this.makeFakerPhone(faker);
    user.type = UserType.LOCAL;
    local.id = "test";
    local.password_hash = hashSync("1234");
    user.localUser = local;
    users.push(user);

    for (let i = 0; i < 120; i++) {
      const user = new User();
      user.name = faker.name.fullName();
      user.phone = this.makeFakerPhone(faker);

      const int = faker.datatype.number({ min: 0, max: this.userTypes.length - 1 });
      const type = this.userTypes[int];
      user.type = type;

      if (user.type === UserType.LOCAL) {
        const localUser = this.localUser(faker);
        user.localUser = localUser;
        users.push(user);
      } else if (user.type === UserType.GOOGLE) {
        user.googleUser = this.googleUser(faker);
        users.push(user);
      } else if (user.type === UserType.KAKAO) {
        user.kakaoUser = this.kakaoUser(faker);
        users.push(user);
      } else {
        // naver
        user.naverUser = this.naverUser(faker);
        users.push(user);
      }
    }

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
      product.sub_images = subImages;
      product.category = category;
      product.stock_count = 10;
      products.push(product);
    }

    return products;
  }

  async onAddCart(faker: Faker) {
    const users = await User.find();
    const count = await Product.count();
    const carts: Cart[] = [];

    for (let i = 0; i < users.length; i++) {
      const cart = new Cart();
      cart.user = users[i];

      const cartProducts: CartProduct[] = [];
      for (let j = 0; j < 5; j++) {
        const cartProduct = new CartProduct();
        cartProduct.count = random(1, 4);
        const randomPk = faker.datatype.number({ min: 1, max: count });
        // eslint-disable-next-line no-await-in-loop
        const product = await Product.findOne({
          where: { pk: randomPk },
        });

        if (isNil(product)) {
          // eslint-disable-next-line no-continue
          continue;
        }

        cartProduct.product = product;
        cartProducts.push(cartProduct);
      }

      // TODO :: 장바구니에 상품이 왜 안들어갈까, console 에 찍히는건 잘 들어감
      cart.cart_products = cartProducts;
      carts.push(cart);
    }

    await Cart.save(carts);
  }

  async onAddPurchase(faker: Faker) {
    // TODO :: 구매 내역 faker 등록
  }

  localUser(faker: Faker) {
    const localUser = new LocalUser();
    localUser.id = faker.datatype.uuid();
    localUser.email = faker.internet.email();
    localUser.password_hash = hashSync(this.randomPassword(faker));

    return localUser;
  }

  googleUser(faker: Faker) {
    const google = new GoogleUser();
    google.sub = faker.name.middleName();
    google.email = faker.internet.email();
    google.social_name = faker.word.noun();

    return google;
  }

  kakaoUser(faker: Faker) {
    const kakao = new KakaoUser();
    kakao.id = faker.datatype.uuid();
    kakao.email = faker.internet.email();
    kakao.social_name = faker.word.noun();

    return kakao;
  }

  naverUser(faker: Faker) {
    const naver = new NaverUser();
    naver.id = faker.datatype.uuid();
    naver.email = faker.internet.email();

    return naver;
  }

  makeFakerPhone(faker: Faker) {
    const second = faker.datatype.number({ min: 1000, max: 9999 });
    const third = faker.datatype.number({ min: 1000, max: 9999 });
    return `010${second}${third}`;
  }

  randomPassword(faker: Faker) {
    return faker.datatype.number({ min: 1000, max: 9999 }).toString();
  }

  async randomUser(): Promise<User | null> {
    if (isNil(this.dataSource)) {
      return null;
    }

    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .orderBy("RANDOM()")
      .getOne();
    return user;
  }
}
