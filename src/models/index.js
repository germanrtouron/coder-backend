import { userModel } from "./mongoModels/user.model.js";
import { productModel } from "./mongoModels/product.model.js";
import { cartModel } from "./mongoModels/cart.model.js";
import { orderModel } from "./mongoModels/order.model.js";
import { options } from "../config/config.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";

export async function getApiDao(dbType) {
  let ProductManager;
  let UserManager;
  let CartManager;
  let OrderManager;
  switch (dbType) {
    case "mysql":
      const { ProductMysqlDao } = await import(
        "./daos/products/productMysqlDao.js"
      );
      const { UserMysqlDao } = await import("./daos/users/userMysqlDao.js");
      const { CartMysqlDao } = await import("./daos/carts/cartMysqlDao.js");
      ProductManager = new ProductMysqlDao(options.sqlite, "products");
      UserManager = new UserMysqlDao(options.sqlite, "users");
      CartManager = new CartMysqlDao(options.sqlite, "carts");
      break;
    case "mongo":
      const { ProductMongoDao } = await import(
        "./daos/products/productMongoDao.js"
      );
      const { UserMongoDao } = await import("./daos/users/userMongoDao.js");
      const { CartMongoDao } = await import("./daos/carts/cartMongoDao.js");
      const { OrderMongoDao } = await import("./daos/orders/orderMongoDao.js");
      const myClient = new MyMongoClient();
      await myClient.connect(options.mongo.url);
      ProductManager = new ProductMongoDao(productModel);
      UserManager = new UserMongoDao(userModel);
      CartManager = new CartMongoDao(cartModel);
      OrderManager = new OrderMongoDao(orderModel);
      break;
    default:
      break;
  }
  return { UserManager, ProductManager, CartManager, OrderManager };
}
