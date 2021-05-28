import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: number,
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
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},

	reviews: [reviewSchema],

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
	price: {
		type: Number,
		required: true,
		default: 0,
	},
	countInStock: {
		type: Number,
		required: true,
		default: 0,
	},
}, {
	timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product;