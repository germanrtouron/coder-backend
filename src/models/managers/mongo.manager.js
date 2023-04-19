import mongoose from "mongoose";

class MongoContainer {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          message: `Cast to ObjectId failed for value ${id} (type string).`,
          error: true,
        };
      }
      const data = await this.model.findById(id);
      if (!data) {
        return {
          message: `The object with the specified ID (${id}) does not exist. Please verify that the ID is correct.`,
          error: true,
        };
      } else {
        const response = JSON.parse(JSON.stringify(data));
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(prop) {
    try {
      const data = await this.model.findOne(prop);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(prop) {
    try {
      const data = await this.model.find(prop);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.find();
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(body) {
    try {
      const data = await this.model.create(body);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(id, body) {
    try {
      const data = await this.model.findByIdAndUpdate(id, body, { new: true });
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          message: `Cast to ObjectId failed for value ${id} (type string).`,
          error: true,
        };
      }
      const response = await this.model.findByIdAndDelete(id);
      if (response === null) {
        return {
          message: `The object with the specified ID (${id}) does not exist. Please verify that the ID is correct.`,
          error: true,
        };
      }
      return "Delete successfully.";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await this.model.delete({});
      return {
        message:
          "All objects from the collection have been successfully deleted.",
        error: false,
      };
    } catch (error) {
      return { message: error, error: true };
    }
  }
}

export { MongoContainer };
