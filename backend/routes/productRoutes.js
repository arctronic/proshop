import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
const router = express.Router();


// @desc all products
// @route GET /api/products
// @access Public route

router.get('/', asyncHandler(async (req, res) => {
	const products = await Product.find({})
	// throw new Error('Some Error Occured!')
	res.json(products)
}))




// @desc single products
// @route GET /api/products/:id
// @access Public route

router.get('/:id', asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
}))

export default router