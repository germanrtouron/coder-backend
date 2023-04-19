import { MysqlContainer } from "../../managers/mysql.manager.js";

class CartMysqlDao extends MysqlContainer {
  constructor(tablename) {
    super(tablename);
  }
}

export { CartMysqlDao };
