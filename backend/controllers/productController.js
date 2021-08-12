import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc all products
// @route GET /api/products
// @access Public route
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc single products
// @route GET /api/products/:id
// @access Public route

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc delete a products
// @route DELETE /api/products/:id
// @access Private route

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Remove" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc create a products
// @route POST /api/products/:id
// @access Private route

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    title: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a products
// @route PUT /api/products/:id
// @access Private route

const updateProduct = asyncHandler(async (req, res) => {
  const {
    
    title,
    price,
    description,
    image,
    category,
    countInStock,
    brand,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
   
    product.title = title;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;
    product.brand = brand;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
