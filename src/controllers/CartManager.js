const CartModel = require("../models/cart.model.js")
class CartManager {

    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;

        } catch (error) {
            console.log("Error to create cart", error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error(`ID ${cartId} cart doesn't exist`)
            }

            return cart;

        } catch (error) {
            console.error("Error to optain cart by ID", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const existProduct = cart.products.find(item => item.product.toString() === productId);

            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            console.error("Error to add product", error);
            throw error;
        }
    }
}

module.exports = CartManager;