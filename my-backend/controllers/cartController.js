const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addToCart = async (req, res, next) => {
    const {userId, productId, quamtity} = req.body;

    try {
        let cart = await Cart.findOne({user: userId});
        if (!cart) {
            cart = new Cart({user: userId, items: []});
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quamtity = quamtity;
        } else {
            cart.items.push({product: productId, quamtity});
        }

        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({message: 'Error adding to cart', error});

    }
}

exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({user: req.params.userId}).populate('items.product');
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({message: 'Error fetching cart', error: err});
    }
}

exports.removeFromCart = async (req, res, next) => {
    const {userId, productId} = req.body;

    try {
        const cart = await Cart.findOne({user: userId});
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({message: 'Error removing from cart', error});
    }
}

exports.updateCartItemQuantity = async (req, res, next) => {
  const { userId, productId, quamtity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quamtity = quamtity;
    await cart.save();

    const updatedCart = await cart.populate('items.product');

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quantity', error });
  }
};