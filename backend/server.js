import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'
import connectDB from './config/db.js'
import productRoute from './routes/productRoutes.js'

dotenv.config()
const app = express()
app.use(cors())

connectDB()

const PORT = process.env.PORT || 5000



app.use('/api/products', productRoute)

app.get('/', (req, res) => {
	res.send("API is ruinning")
})

app.use(notFound)

app.use(errorHandler)



app.listen(5000, console.log(`Server running on port ${PORT}`.yellow.bold))




