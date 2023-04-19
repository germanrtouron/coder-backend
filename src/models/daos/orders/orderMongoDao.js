import { MongoContainer } from "../../managers/mongo.manager.js";

class OrderMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { OrderMongoDao };
