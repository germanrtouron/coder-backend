import { apiDao } from "../models/apiDao.js";

const { CartManager } = apiDao;

export class cartService {
  static async getCarts() {
    return await CartManager.getAll();
  }

  static async getCartById(id) {
    return await CartManager.getById(id);
  }

  static async getCartByUser(user) {
    return await CartManager.findOne(user);
  }

  static async createCart(user, email, address) {
    const body = { user: user, email: email, address: address, products: [] };
    return await CartManager.save(body);
  }

  static async addProductToCart(productId, cartId) {
    try {
      const cart = await CartManager.getById(cartId);
      if (!cart) {
        throw new Error(`Cart with id ${cartId} not found.`);
      }
      // check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex > -1) {
        // if the product is already in the cart, increment its quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // if the product is not in the cart, add it with a quantity of 1
        cart.products.push({
          productId: productId,
          quantity: 1,
        });
      }
      // save the updated cart
      const updatedCart = await CartManager.updateById(cartId, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  }

  static async updateProductQuantityInCart(productID, cartID, newQuantity) {
    try {
      const cart = await CartManager.getById(cartID);
      if (!cart) {
        throw new Error(`Cart with id ${cartID} not found.`);
      }
      // check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (product) => product.productId === productID
      );
      if (productIndex > -1) {
        // update the product quantity
        cart.products[productIndex].quantity = newQuantity;
      } else {
        // if the product is not in the cart, add it to the cart with the new quantity
        cart.products.push({
          productId: productID,
          quantity: newQuantity,
        });
      }
      // save the updated cart
      const updatedCart = await CartManager.updateById(cartID, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(
        `Error updating the quantity of the product in the cart: ${error.message}`
      );
    }
  }

  static async deleteProductFromCart(productId, cartId) {
    try {
      const cart = await CartManager.getById(cartId);
      if (!cart) {
        throw new Error(`Cart with id ${cartId} not found.`);
      }
      // check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex > -1) {
        // if the product is in the cart, remove it from the cart
        cart.products.splice(productIndex, 1);
      }
      // save the updated cart
      const updatedCart = await CartManager.updateById(cartId, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error deleting product from cart: ${error.message}`);
    }
  }

  static async deleteCart(id) {
    return await CartManager.deleteById(id);
  }
}
