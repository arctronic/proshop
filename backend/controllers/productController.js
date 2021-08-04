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
    const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
});

export{
    getProductByID,
    getProducts,
}