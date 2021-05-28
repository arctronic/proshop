import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Components/Product'


const HomeScreen = () => {

	const [products, setProduct] = useState([]);

	useEffect(()=>{
		fetch("http://localhost:5000/api/products")
			.then(data => data.json())
			.then(prod => setProduct(prod))
	},[])

	return (
		<div>
			<h1>Latest Products</h1>
			<Row>
				{
					products.map(prod=>(
						<Col key = {prod.id} sm={12} md={6} lg={4} xl={3}>
							<Product  obj = {prod}></Product>
						</Col>
					))
				}
			</Row>
		</div>
	);
};
export default HomeScreen;