import { apiDao } from "../models/apiDao.js";

const { ProductManager } = apiDao;

export class productService {
  static async getProducts() {
    return await ProductManager.getAll();
  }
  static async getProduct(id) {
    return await ProductManager.getById(id);
  }
  static async saveProduct(body) {
    return await ProductManager.save(body);
  }
  static async updateProduct(body, id) {
    return await ProductManager.updateById(body, id);
  }
  static async deleteProduct(id) {
    return await ProductManager.deleteById(id);
  }
  static async deleteProducts() {
    return await ProductManager.deleteAll();
  }
}
