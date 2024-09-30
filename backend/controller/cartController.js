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
        // Assuming you get the userId from req.user (e.g., via JWT middleware)
        const userId = req.user._id; 

        // Find the cart for the user, and populate product details in the items array
        const cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.product', // Populate the product field inside items
                // select: 'title price images brand category' // Select fields to return for products
            })
            .exec();

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Return cart details as JSON
        return res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice,
                updatedAt: cart.updatedAt
            }
        });

    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        // Assuming you get the userId from req.user (e.g., via JWT middleware)
        const userId = req.user._id;
        const productId = req.params.productId;

        // Find the cart of the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Find the product in the cart items
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        // Remove the product from the cart items
        const removedItem = cart.items[itemIndex];
        cart.items.splice(itemIndex, 1);

        // Update total price and total items
        cart.totalPrice -= removedItem.price * removedItem.quantity;
        cart.totalItems -= removedItem.quantity;

        // Save the updated cart
        await cart.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Product removed from cart',
            cart: {
                items: cart.items,
                totalPrice: cart.totalPrice,
                totalItems: cart.totalItems,
                updatedAt: cart.updatedAt
            }
        });

    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const updateCartItem = async (req, res) => {
    try {
        // Assuming you get the userId from req.user (e.g., via JWT middleware)
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        // Find the product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                user: userId,
                items: [],
                totalPrice: 0,
                totalItems: 0
            });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // If the product exists, update the quantity
            const existingItem = cart.items[itemIndex];
            cart.items[itemIndex].quantity = quantity;

            // Update total price and total items based on the quantity change
            const priceDifference = (quantity - existingItem.quantity) * product.price;
            cart.totalPrice += priceDifference;
            cart.totalItems += (quantity - existingItem.quantity);
        } else {
            // If the product doesn't exist, add it as a new item
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price
            });

            // Update total price and total items
            cart.totalPrice += product.price * quantity;
            cart.totalItems += quantity;
        }

        // Save the updated cart
        await cart.save();

        // Return success response with updated cart details
        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart: {
                items: cart.items,
                totalPrice: cart.totalPrice,
                totalItems: cart.totalItems,
                updatedAt: cart.updatedAt
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { addToCart, getCart, deleteCartItem, updateCartItem };