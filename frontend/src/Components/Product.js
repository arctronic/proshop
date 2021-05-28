import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating'
import './component.css'


const styles = {
	card: {
	  backgroundColor: '#B7E0F2',
	  borderRadius: 10,
	  padding: '3rem'
	},
	cardImage: {
	  objectFit: 'cover',
	  borderRadius: 20
	}
  }


const Product = (props) => {
	const product = props.obj;
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product.id}`}>
				<div className="mx-2 my-2 p-3" id="image_box">
					<Card.Img src={product.image} variant='top' style={styles.cardImage} />
				</div>
			</Link>

			<Card.Body>
				<Link to={`/product/${product.id}`} id="text_title">
					<Card.Title as='div' >
						<strong>
							{
								product.title
							}
						</strong>
					</Card.Title>
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