import { cartService } from "../../services/cart.service.js";
import { productService } from "../../services/product.service.js";

export class cartController {
  static async getAuthenticatedUserCart(req, res) {
    try {
      const response = await cartService.getCartByUser({
        user: req.user._id,
      });
      if (!response) {
        cartController.handleError(
          res,
          `You do not have any active shopping carts. Add products to create one.`
        );
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

  static async getCarts(req, res) {
    try {
      const response = await cartService.getCarts();
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

  static async getCartById(req, res) {
    try {
      const response = await cartService.getCartById(req.params.id);
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

  static async createCart(req, res) {
    try {
      const cartByUser = await cartService.getCartByUser({
        user: req.user._id,
      });
      if (!cartByUser) {
        const response = await cartService.createCart(
          req.user._id,
          req.user.email,
          req.user.address
        );
        res.status(200).json({
          status: "SUCCESS",
          data: response,
        });
      } else {
        res.status(200).json({
          status: "ERROR",
          message: "The user already has a shopping cart.",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async addProductToCart(req, res) {
    try {
      let cart = await cartService.getCartByUser({ user: req.user._id });
      if (!cart) {
        const newCart = await cartService.createCart(
          req.user._id,
          req.user.email,
          req.user.address
        );
        cart = newCart;
      }
      const productId = req.body.product;
      const verifyProduct = await productService.getProduct(productId);
      if (verifyProduct.error) {
        cartController.handleError(
          res,
          `Product with id ${productId} does not exist.`
        );
        return;
      }
      const cartId = cart._id;
      const response = await cartService.addProductToCart(productId, cartId);
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

  static async addProductToAnyCart(req, res) {
    try {
      const cartID = req.params.cartID;
      const cart = await cartService.getCartById(cartID);
      if (cart.error) {
        cartController.handleError(
          res,
          `Cart with id ${cartID} does not exist.`
        );
        return;
      }
      const productId = req.body.product;
      const verifyProduct = await productService.getProduct(productId);
      if (verifyProduct.error) {
        cartController.handleError(
          res,
          `Product with id ${productId} does not exist.`
        );
        return;
      }
      const response = await cartService.addProductToCart(productId, cartID);
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

  static async updateProductQuantityInCart(req, res) {
    try {
      const cart = await cartService.getCartByUser({ user: req.user._id });
      const cartID = cart._id;
      const verifyCart = await cartService.getCartById(cartID);
      if (verifyCart.error) {
        cartController.handleError(
          res,
          `Cart with id ${cartID} does not exist.`
        );
        return;
      }
      const productID = req.params.productID;
      const verifyProduct = await productService.getProduct(productID);
      if (verifyProduct.error) {
        cartController.handleError(
          res,
          `Product with id ${productID} does not exist.`
        );
        return;
      }
      const newQuantity = req.body.quantity;
      if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
        cartController.handleError(
          res,
          `The quantity (${newQuantity}) must be an integer greater than 1.`
        );
        return;
      }
      const response = await cartService.updateProductQuantityInCart(
        productID,
        cartID,
        newQuantity
      );
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

  static async updateProductQuantityInAnyCarts(req, res) {
    try {
      const cartID = req.params.cartID;
      const verifyCart = await cartService.getCartById(cartID);
      if (verifyCart.error) {
        cartController.handleError(
          res,
          `Cart with id ${cartID} does not exist.`
        );
        return;
      }
      const productID = req.params.productID;
      const verifyProduct = await productService.getProduct(productID);
      if (verifyProduct.error) {
        cartController.handleError(
          res,
          `Product with id ${productID} does not exist.`
        );
        return;
      }
      const newQuantity = req.body.quantity;
      if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
        cartController.handleError(
          res,
          `The quantity (${newQuantity}) must be an integer greater than 1.`
        );
        return;
      }
      const response = await cartService.updateProductQuantityInCart(
        productID,
        cartID,
        newQuantity
      );
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

  static async deleteProductFromCart(req, res) {
    try {
      const productID = req.params.productID;
      const cart = await cartService.getCartByUser({ user: req.user._id });
      const cartID = cart._id;
      const verifyCart = await cartService.getCartById(cartID);
      if (verifyCart.error) {
        cartController.handleError(
          res,
          `Cart with id ${cartID} does not exist.`
        );
        return;
      }
      const response = await cartService.deleteProductFromCart(
        productID,
        cartID
      );
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

  static async deleteProductFromAnyCart(req, res) {
    try {
      const productID = req.params.productID;
      const cartID = req.params.cartID;
      const response = await cartService.deleteProductFromCart(
        productID,
        cartID
      );
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

  static async deleteCart(req, res) {
    try {
      const cart = await cartService.getCartByUser({ user: req.user._id });
      if (!cart) {
        cartController.handleError(
          res,
          `You do not have any active shopping carts. Add products to create one.`
        );
        return;
      }
      const cartID = cart._id;
      const response = await cartService.deleteCart(cartID);
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

  static async deleteAnyCart(req, res) {
    try {
      const response = await cartService.deleteCart(req.params.cartID);
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
