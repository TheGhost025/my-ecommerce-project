const Product = require('../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, stock, supplier } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      supplier,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
}

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ }).populate('supplier', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
}

exports.getSupplierProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ supplier: req.params.supplierId }).populate('supplier', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
}

exports.searchProducts = async (req, res, next) => { 
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ message: 'Error searching products', error });
  }
};