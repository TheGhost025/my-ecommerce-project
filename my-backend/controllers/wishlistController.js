const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const wishlist = await Wishlist.findOne({userId}).populate('products');
        res.status(200).json(wishlist || {products: []});
    }
    catch(err){
        res.status(500).json({ error: err.message});
    }
}

exports.addToWishlist = async (req, res, next) => {
    const {userId, productId} = req.body;
    try {
        let wishlist = await Wishlist.findOne({userId});
        if (!wishlist) {
            wishlist = new Wishlist({userId, products: [productId]});
        }
        else if(!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json({message: 'Product added to wishlist'});
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.removeFromWishlist = async (req, res, next) => {
    const {userId, productId} = req.body;
    try {
        const wishlist = await Wishlist.findOne({userId});
        if(wishlist){
            wishlist.products.pull(productId);
            await wishlist.save();
        }
        res.status(200).json({message: 'Product removed from wishlist'});
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.isWhishlist = async (req, res, next) => { 
    const { userId, productId } = req.query;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'Missing userId or productId' });
    }

    try {
        const wishlist = await Wishlist.findOne({ userId });

        const isWishlisted = wishlist?.products.includes(productId);
        res.json({ isWishlisted });
    } catch (error) {
        console.error('Error checking wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }