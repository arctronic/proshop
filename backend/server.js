const express = require('express')
const products = require('./Data/products')

const app = express()

app.listen(5000, console.log("Server running on port 5000"))

app.get('/',(req,res)=>{
	res.send("API is ruinning")
})

app.get('/api/products',(req,res)=>{
	console.log("Sending all products");
	res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
	const product = products.find((p)=>p.id == req.params.id);
	console.log("Called");
	console.log(product.title);
	res.json(product)
})