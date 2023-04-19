import knex from "knex";

class MysqlContainer {
  constructor(options, tablename) {
    this.database = knex(options);
    this.tablename = tablename;
  }

  async getById(id) {
    try {
      const data = await this.database.from(this.tableName).where("id", id);
      if (!data.length) {
        return {
          message: `The object with the specified ID (${id}) does not exist. Please verify that the ID is correct.`,
          error: true,
        };
      }
      const response = JSON.parse(JSON.stringify(data));
      return { response, error: false };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(prop) {
    try {
      const data = await this.database.from(this.tableName).where(prop, prop);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.database.from(this.tableName).select("*");
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(body) {
    try {
      const [id] = await this.database.from(this.tableName).insert(body);
      return `Saved successfully with id: ${id}.`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(body, id) {
    try {
      const object = await this.getById(id);
      if (object.error) {
        return {
          message: `Id not found: ${id}.`,
          error: true,
        };
      }
      await this.database.from(this.tableName).where("id", id).update(body);
      return { message: "Update successfully." };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      const result = await this.database
        .from(this.tableName)
        .where("id", id)
        .del();
      if (result === 0) {
        return { message: `Id not found: ${id}.` };
      } else {
        return { message: "Delete successfully." };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await this.database.from(this.tableName).del();
      return { message: "Delete successfully." };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { MysqlContainer };
