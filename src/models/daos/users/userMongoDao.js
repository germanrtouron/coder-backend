import { MongoContainer } from "../../managers/mongo.manager.js";

class UserMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { UserMongoDao };
