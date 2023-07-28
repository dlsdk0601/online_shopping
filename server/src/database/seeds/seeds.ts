import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Faker, faker } from "@faker-js/faker";
import { isNil } from "lodash";
import Manager, { ManagerType } from "../../entities/manager.entity";
import { getHash } from "../../ex/bcryptEx";
import { User } from "../../entities/user.entity";
import { ProductCategory, UserType } from "../../type/commonType";
import { LocalUser } from "../../entities/local-user.entity";
import Authentication from "../../entities/manager-authentication.entity";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "../../entities/user-authentication.entity";
import { Subscribe } from "../../entities/subscribe.entity";
import { Product } from "../../entities/product.entity";
import { Asset } from "../../entities/asset.entity";
import { MainBanner } from "../../entities/main-banner.entity";
import { Cart, CartProduct } from "../../entities/cart.entity";

export default class TypeOrmSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    console.log("----------------Faker Insert Start----------------");

    faker.locale = "ko";
    return Promise.all([
      this.onAddManager(faker, dataSource),
      this.onAddUser(faker, dataSource),
      this.onAddProduct(faker),
      this.onAddBanner(faker),
      this.onAddCart(faker),
    ]).then(() => console.log("success"));
  }

  async onAddManager(faker: Faker, dataSource: DataSource) {
    const manager = dataSource.getRepository(Manager);
    const oldManagers = await manager.find();
    await manager.remove([...oldManagers]);
    const oldAuths = await Authentication.find();
    await Authentication.remove([...oldAuths]);

    const managers = await this.managerList(faker);
    await manager.insert([...managers]);
  }

  async onAddUser(faker: Faker, dataSource: DataSource) {
    const localUser = dataSource.getRepository(LocalUser);
    const oldLocalAuths = await LocalAuthentication.find();
    await LocalAuthentication.remove([...oldLocalAuths]);
    const oldGoogleAuths = await GoogleAuthentication.find();
    await GoogleAuthentication.remove([...oldGoogleAuths]);
    const oldKakaoAuths = await KakaoAuthentication.find();
    await KakaoAuthentication.remove([...oldKakaoAuths]);
    const oldNaverAuths = await NaverAuthentication.find();
    await NaverAuthentication.remove([...oldNaverAuths]);

    const oldLocalUsers = await localUser.find();
    await localUser.remove([...oldLocalUsers]);

    const users = await this.userList(faker, dataSource);
    await localUser.insert([...users]);
  }

  async onAddBanner(faker: Faker) {
    const oldBanners = await MainBanner.find();
    await MainBanner.remove([...oldBanners]);

    const newBanners = await this.bannerList(faker);
    await MainBanner.insert([...newBanners]);
  }

  async onAddProduct(faker: Faker) {
    const oldProducts = await Product.find();
    await Product.remove(oldProducts);

    const newMensProducts = await this.productList(faker, ProductCategory.MEN);
    const newWomensProducts = await this.productList(faker, ProductCategory.WOMEN);
    const newKidsProducts = await this.productList(faker, ProductCategory.KIDS);
    const newAccessoryProducts = await this.productList(faker, ProductCategory.ACCESSORY);

    await Product.insert([
      ...newMensProducts,
      ...newWomensProducts,
      ...newKidsProducts,
      ...newAccessoryProducts,
    ]);
  }

  async onAddCart(faker: Faker) {
    const carts = this.cartList(faker);
    const cartProduct: CartProduct[] = [];

    for (let i = 0; i < carts.length; i++) {
      const cartProductEntity = new CartProduct();
      cartProductEntity.product = (await Product.findOne({
        where: { pk: carts[i].product_pk },
      })) as Product;
      cartProductEntity.count = carts[i].count;
      cartProduct.push(cartProductEntity);
    }

    await CartProduct.insert(cartProduct);

    const user = await User.findOne({ where: { pk: 4090 } });
    const cart = new Cart();

    if (isNil(user)) {
      return;
    }

    cart.user = user;
    cart.cart_products = cartProduct;
    await cart.save();
  }

  async managerList(faker: Faker) {
    const managers: {
      id: string;
      name: string;
      email: string;
      password_hash: string;
      type: ManagerType;
    }[] = [];

    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      const password_hash = await getHash(this.randomPassword(faker));
      const newManager = {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password_hash,
        type: ManagerType.MANAGER,
      };

      managers.push(newManager);
    }

    managers[0].id = "manager";
    managers[0].name = "manager";
    managers[0].email = "manager@test.com";
    managers[0].password_hash = await getHash("1234");

    return managers;
  }

  async productList(faker: Faker, category: ProductCategory): Promise<Product[]> {
    const products: Product[] = [];

    let pk: number;
    switch (category) {
      case ProductCategory.MEN:
        pk = 65;
        break;
      case ProductCategory.WOMEN:
        pk = 66;
        break;
      case ProductCategory.KIDS:
        pk = 67;
        break;
      case ProductCategory.ACCESSORY:
      default:
        pk = 68;
        break;
    }

    const mainImage = await Asset.findOne({ where: { pk } });
    if (isNil(mainImage)) {
      return [];
    }

    const subImages = await Asset.find({ where: [{ pk: 64 }, { pk: 63 }] });
    for (let i = 0; i < 20; i++) {
      const mens = new Product();
      mens.name = faker.name.fullName();
      mens.description_title = faker.random.words(4);
      mens.description = faker.random.words(50);
      mens.price = Number(faker.random.numeric(3));
      mens.main_image = mainImage;
      mens.sub_images = subImages; // TODO :: 서브 이미지들이 안들어간다.
      mens.category = category;
      mens.stock_count = 10;
      products.push(mens);
    }

    return products;
  }

  async userList(faker: Faker, dataSource: DataSource) {
    const localUsers: {
      id: string;
      email: string;
      password_hash: string;
      pk: number;
    }[] = [];

    const userRepository = dataSource.getRepository(User);
    const oldUsers = await userRepository.find();
    await userRepository.remove([...oldUsers]);

    for (let i = 0; i < 120; i++) {
      const user = new User();
      const subscribe = new Subscribe();

      user.name = faker.name.fullName();
      user.phone = this.makeFakerPhone(faker);
      user.type = UserType.LOCAL;
      // eslint-disable-next-line no-await-in-loop
      const savedUser = await userRepository.save(user);
      subscribe.user = savedUser;
      subscribe.email = faker.internet.email();
      subscribe.name = faker.name.fullName();
      // eslint-disable-next-line no-await-in-loop
      await subscribe.save();

      // eslint-disable-next-line no-await-in-loop
      const password_hash = await getHash(this.randomPassword(faker));
      const localUser = {
        id: i === 0 ? "test" : faker.datatype.uuid(),
        email: faker.internet.email(),
        password_hash,
        pk: savedUser.pk,
      };
      localUsers.push(localUser);
    }

    localUsers[0].id = "test";
    localUsers[0].password_hash = await getHash("1234");

    return localUsers;
  }

  async newBanner(faker: Faker, category: ProductCategory) {
    let imagePk: number;
    switch (category) {
      case ProductCategory.WOMEN:
        imagePk = 72;
        break;
      case ProductCategory.MEN:
        imagePk = 73;
        break;
      case ProductCategory.KIDS:
        imagePk = 74;
        break;
      case ProductCategory.ACCESSORY:
      default:
        imagePk = 75;
        break;
    }
    const banner = new MainBanner();
    banner.category = category;
    banner.title = faker.random.words(2);
    banner.sub_title = faker.random.words(4);
    banner.description = category === ProductCategory.WOMEN ? null : faker.random.words(4);
    banner.image = await Asset.findOneByOrFail({ pk: imagePk });

    return banner;
  }

  async bannerList(faker: Faker) {
    return [
      await this.newBanner(faker, ProductCategory.WOMEN),
      await this.newBanner(faker, ProductCategory.MEN),
      await this.newBanner(faker, ProductCategory.KIDS),
      await this.newBanner(faker, ProductCategory.ACCESSORY),
    ];
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

  makeFakerPhone(faker: Faker) {
    const second = faker.datatype.number({ min: 1000, max: 9999 });
    const third = faker.datatype.number({ min: 1000, max: 9999 });
    return `010${second}${third}`;
  }

  randomPassword(faker: Faker) {
    return faker.datatype.number({ min: 1000, max: 9999 }).toString();
  }
}
