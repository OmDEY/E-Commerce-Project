const Cart = require('../models/cartSchema');
const Product = require('../models/product');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Fetch the product details to get the price
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            // Create a new cart if the user doesn't have one
            const newCart = new Cart({
                user: req.user._id,
                items: [{ product: productId, quantity, price: product.price }],
                totalPrice: product.price * quantity,
                totalItems: 1
            });
            await newCart.save();
            return res.status(201).json({ message: 'Product added to cart successfully' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex !== -1) {
            // If the product is already in the cart, update its quantity and price
            const item = cart.items[itemIndex];
            const newQuantity = item.quantity + quantity;
            cart.items[itemIndex].quantity = newQuantity;
            cart.items[itemIndex].price = product.price;

            // Update total price and total items
            cart.totalPrice += product.price * quantity;
            await cart.save();
            return res.status(201).json({ message: 'Product quantity updated successfully' });
        } else {
            // If the product is not in the cart, add it
            cart.items.push({ product: productId, quantity, price: product.price });
            cart.totalPrice += product.price * quantity;
            cart.totalItems += 1;
            await cart.save();
            return res.status(201).json({ message: 'Product added to cart successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { addToCart, getCart };