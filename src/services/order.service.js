import { apiDao } from "../models/apiDao.js";

const { OrderManager } = apiDao;

export class orderService {
  static async getOrders() {
    return await OrderManager.getAll();
  }

  static async getOrderById(id) {
    return await OrderManager.getById(id);
  }

  static async getOrdersByUserId(user) {
    return await OrderManager.findAll(user);
  }

  static async saveOrder(order) {
    return await OrderManager.save(order);
  }

  static async deleteOrderById(id) {
    return await OrderManager.deleteById(id);
  }
}
