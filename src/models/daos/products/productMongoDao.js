import { MongoContainer } from "../../managers/mongo.manager.js";

class ProductMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { ProductMongoDao };
