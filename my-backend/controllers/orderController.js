const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res, next) => {
    try {
        const { customer } = req.body;
    
        const cart = await Cart.findOne({ user: customer }).populate('items.product');
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: 'Cart is empty' });
        }
    
        let total = 0;
        const updatedProducts = [];
    
        for (const item of cart.items) {
          const product = item.product;
    
          if (!product) {
            return res.status(404).json({ message: `Product not found in cart` });
          }
    
          if (product.stock < item.quantity) {
            return res.status(400).json({ message: `Not enough stock for ${product.name}` });
          }
    
          total += product.price * item.quantity;
    
          updatedProducts.push({
            product: product._id,
            quantity: item.quantity,
            supplier: product.supplier
          });
    
          product.stock -= item.quantity;
          await product.save();
        }
    
        const order = new Order({
          customer,
          products: updatedProducts,
          total
        });
    
        await order.save();
    
        // ✅ Clear the cart after successful order
        await Cart.deleteOne({ user: customer });
    
        res.status(201).json({ message: 'Order created and cart cleared', order });
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error });
      }
}

exports.getOrderBySupplier = async (req, res, next) => {
    const { supplierId } = req.params;

    try {
        const orders = await Order.find({})
            .populate({path : 'products.product',
                match: { supplier: supplierId },
                populate: { path: 'supplier', select: 'name' }
    })
            .populate('customer', 'name');

            const filteredOrders = orders.products.map(order => {
                const filteredProducts = order.products.filter(p => p.product  != null);

                if(filteredProducts.length > 0) {
                    return {
                        ...order.toObject(),
                        products: filteredProducts,
                    };
                }

                return null;
            }).filter(order => order != null);

            res.json(filteredOrders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching supplier orders", error: err });
    }
}

exports.getOrderByCustomer = async (req, res, next) => {
    const { customerId } = req.params.id;

    try {
        const orders = await Order.find({ customer: customerId })
            .populate({
                path: 'products.product',
                populate: { path: 'supplier', select: 'name' }
            });

        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching customer orders", error: err });
    }
}