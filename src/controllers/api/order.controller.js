import { cartService } from "../../services/cart.service.js";
import { productService } from "../../services/product.service.js";
import { orderService } from "../../services/order.service.js";
import { sendMail } from "../../utils/sendMail.js";
import { orderMailTemplate } from "../../templates/mail/orderMailTemplate.js";

export class orderController {
  static async getAuthenticatedUserOrders(req, res) {
    try {
      const response = await orderService.getOrdersByUserId({
        userID: req.user._id,
      });
      if (!response || response.length === 0) {
        orderController.handleError(res, `You do not have any active order.`);
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getOrders(req, res) {
    try {
      const response = await orderService.getOrders();
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getOrderById(req, res) {
    try {
      const response = await orderService.getOrderById(req.params.orderID);
      if (response.error) {
        cartController.handleError(res, response.message);
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getOrdersByUserId(req, res) {
    try {
      const response = await orderService.getOrdersByUserId({
        userID: req.params.userID,
      });
      if (!response) {
        cartController.handleError(res, `You do not have any active order.`);
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async generateOrderForAuthenticatedUserCart(req, res) {
    try {
      const authenticatedUserCart = await cartService.getCartByUser({
        user: req.user._id,
      });
      const newOrder = {
        userID: authenticatedUserCart.user,
        email: authenticatedUserCart.email,
        address: authenticatedUserCart.address,
        products: [],
        totalPrice: "",
        status: "generated",
      };
      let totalOrderPrice = 0;
      for (const item of authenticatedUserCart.products) {
        const product = await productService.getProduct(item.productId);
        const productInfo = {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: item.quantity,
        };
        const productTotalPrice = product.price * item.quantity;
        productInfo.totalPrice = productTotalPrice;
        newOrder.products.push(productInfo);
        totalOrderPrice += productTotalPrice;
      }
      newOrder.totalPrice = totalOrderPrice;
      const response = await orderService.saveOrder(newOrder);
      if (response) {
        const subject = `New user order from ${newOrder.email}.`;
        const html = orderMailTemplate(newOrder);
        sendMail(subject, html);
        await cartService.deleteCart(authenticatedUserCart._id);
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async deleteOrderById(req, res) {
    try {
      const response = await orderService.deleteOrderById(req.params.orderID);
      if (response.error) {
        cartController.handleError(res, response.message);
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static handleError(res, message) {
    res.status(400).json({
      status: "ERROR",
      message: message,
    });
  }
}
