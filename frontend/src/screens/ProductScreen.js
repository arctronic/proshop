import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProductDetails } from "../actions/productAction";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Rating from "../Components/Rating";
import "./screen.css";

const ProductScreen = ({ history, match }) => {
  const id = match.params.id;

  const [qty, setQty] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const styles = {
    Row: {
      display: "block",
    },
  };

  return (
    <>
      
      {loading ? (
        <Loader> </Loader>
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <div>
          <Link className="btn btn-light my-3" to="/">
            Go back
          </Link>
          <Row style={styles}>
            <Col md={6} id="image_container">
              <Image src={product.image} id="prod_image" />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3> {product.title} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item> Price: $ {product.price} </ListGroup.Item>
                <ListGroup.Item>
                  <h5> Description: </h5> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup.Item>
                  <Row>
                    <Col> Price: </Col>
                    <Col>
                      <strong> $ {product.price} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Status: </Col>
                    <Col>
                      
                      {product.countInStock > 0
                        ? `In Stock (${product.countInStock})`
                        : "Stock out"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col> Qty </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          min={0}
                          max={product.countInStock}
                          value={qty}
                          onChange={(e) => {
                            setQty(parseInt(e.target.value) + 1);
                            console.log(qty);
                          }}
                        >
                          
                          {/* {[...Array(product.countInStock).keys()].map(x => (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ))} */}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={qty === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
          <Row>
            <Link className="btn btn-light my-3" to="/">
              <i class="fas fa-arrow-circle-left" id="back">
                
              </i>
            </Link>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
