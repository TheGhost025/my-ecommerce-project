const express = require('express');
const router = express.Router();
const {getWishlist, addToWishlist, removeFromWishlist, isWhishlist} = require('../controllers/wishlistController');

router.get('/isWhishlist', isWhishlist);
router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.get('/:userId', getWishlist);

module.exports = router;