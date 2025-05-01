const User = require('../models/User');

exports.getSupplierProfile = async (req,res,next) => {
    const supplierId = req.params.id; // Get the supplier ID from the request parameters

    try {
        // Find the supplier by ID and populate the 'products' field
        const user = await User.findById(supplierId);
        if (!user) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(user);
    }
        catch (error) {
            console.error('Error fetching supplier profile:', error);
            res.status(500).json({ message: 'Error fetching supplier profile' });
        }
}

exports.getCustomerProfile = async (req,res,next) => {
    const customerId = req.params.id; // Get the supplier ID from the request parameters

    try {
        // Find the customer by ID and populate the 'products' field
        const user = await User.findById(customerId);
        if (!user) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(user);
    }
        catch (error) {
            console.error('Error fetching customer profile:', error);
            res.status(500).json({ message: 'Error fetching customer profile' });
        }
}