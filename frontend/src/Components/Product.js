import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating'
const Product = (props) => {
	const product = props.obj;
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product.id}`}>
				<div className="mx-3 my-3 p-3">
					<Card.Img src={product.image} variant='top' />
				</div>
			</Link>

			<Card.Body>
				<Link to={`/product/${product.id}`}>
					<Card.Title as='div'><strong>
						{
							product.title
						}
					</strong></Card.Title>
				</Link>
			</Card.Body>


			<Card.Text as='div'>
				<Rating value={product.rating} text={`${product.numReviews} reviews`} color='red'></Rating>
			</Card.Text>

			<Card.Text as='h3'>
				<div className="my-3">
					$ {
						product.price
					}
				</div>
			</Card.Text>

		</Card>

	);
};

export default Product;