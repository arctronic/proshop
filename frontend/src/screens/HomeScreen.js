import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'

import { listProduct } from '../actions/productAction';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
const HomeScreen = () => {


	const dispatch = useDispatch();

	const productList = useSelector(state => state.productList)
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProduct())
	}, [dispatch])


	return (
		<div>
			<h1>Latest Products</h1>
			{loading ? <Loader></Loader> :
				error ?
					<Message variant='danger'>{error}</Message> : <Row>
						{
							products.map(prod => (
								<Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
									<Product obj={prod}></Product>
								</Col>
							))
						}
					</Row>}

		</div>
	);
};
export default HomeScreen;