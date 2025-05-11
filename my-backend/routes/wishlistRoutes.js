const express = require('express');
const router = express.Router();
const {getWishlist, addToWishlist, removeFromWishlist} = require('../controllers/wishlistController');

router.get('/:userId', getWishlist);
router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);

module.exports = router;