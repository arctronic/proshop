import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	}

}, {
	timestamps: true,
})

const productSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',

		/*
			This is for record, which admin inserted the product
			type is ID type object and refference to User Schema
		*/
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		default: 0,
	},

	description: {
		type: String,
		required: true,
	},


	category: {
		type: String,
		required: true,
	},

	image: {
		type: String,
		required: true,
	},

	rating: {
		type: Number,
		required: true,
		default: 0,
	},

	numReviews: {
		type: Number,
		required: true,
		default: 0,
	},

	countInStock: {
		type: Number,
		required: true,
		default: 0,
	},

	brand: {
		type: String,
		required: false,
	},
	reviews: [reviewSchema],

}, {
	timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product;