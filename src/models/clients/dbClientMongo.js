import mongoose from "mongoose";
import { logger } from "../../logs/logger.js";

class MyMongoClient {
  constructor() {
    this.client = mongoose;
  }

  async connect(url) {
    try {
      await this.client.connect(url);
      logger.info(
        "Successful connection to MongoDB database. You may now begin querying and updating information."
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      logger.info("MongoDB database disconnected successfully.");
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { MyMongoClient };
