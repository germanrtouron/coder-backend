import { productService } from "../../services/product.service.js";

export class productController {
  static async getProducts(req, res) {
    try {
      const response = await productService.getProducts();
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

  static async getProduct(req, res) {
    try {
      const response = await productService.getProduct(req.params.id);
      if (response.error) {
        productController.handleError(res, response.message);
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

  static async saveProduct(req, res) {
    try {
      const response = await productService.saveProduct(req.body);
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

  static async updateProduct(req, res) {
    try {
      const response = await productService.updateProduct(
        req.body,
        req.params.id
      );
      if (response.error) {
        productController.handleError(res, response.message);
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

  static async deleteProduct(req, res) {
    try {
      const response = await productService.deleteProduct(req.params.id);
      if (response.error) {
        productController.handleError(res, response.message);
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

  static async deleteProducts(req, res) {
    try {
      const response = await productService.deleteProducts();
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
