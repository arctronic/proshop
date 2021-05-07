import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products'
import Product from '../Components/Product'
const HomeScreen = () => {
	return (
		<div>
			<h1>Latest Products</h1>
			<Row>
				{
					products.map(prod=>(
						<Col sm={12} md={6} lg={4} xl={4}>
							<Product obj = {prod}></Product>
						</Col>
					))
				}
			</Row>
		</div>
	);
};
export default HomeScreen;