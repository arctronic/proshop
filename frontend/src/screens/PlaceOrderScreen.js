import React, { useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import CheckOutSteps from "../Components/CheckOutSteps";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
    console.log(cart.cartItems);
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <p><strong>Address</strong></p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                Post Code: {cart.shippingAddress.postalCode},  
                 {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>
                    Payment Method
                </h2>
                <p>
                    <strong>{cart.paymentMethod}</strong>
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Item</h2>
                {cart.cartItems.length ===0 ? <Message>Your Cart is empty</Message>:
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>

                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
