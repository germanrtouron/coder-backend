import { MongoContainer } from "../../managers/mongo.manager.js";

class CartMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { CartMongoDao };
