import  express from 'express'
import  dotenv from 'dotenv'
import cors  from 'cors'
import  products from './Data/products.js'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 1562

app.listen(5000, console.log(`Server running on port ${PORT}`))

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