import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {
	console.log(match.params.id)
	const product = products.find((p) => p.id == match.params.id)
	console.log(product)

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>

			<Row>
				<Col md={6}>
					<Image src={product.image} fluid />
				</Col>

				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.title}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
						</ListGroup.Item>

						<ListGroup.Item>
							Price: ${product.price}
						</ListGroup.Item>

						<ListGroup.Item>
							<h5>Description:</h5> {product.description}
						</ListGroup.Item>

					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup.Item>
							<Row>
								<Col>
									Price:
								</Col>

								<Col>
									<strong>${product.price}</strong>
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>
									Status:
								</Col>

								<Col>
									{
										product.countInStock > 0 ? 'In Stock' : 'Stock out'
									}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Button className='btn-block' type='button' disabled={product.countInStock === 0}>
								Add to Cart
							</Button>
						</ListGroup.Item>

					</Card>
				</Col>

			</Row>

		</>
	);
};

export default ProductScreen;