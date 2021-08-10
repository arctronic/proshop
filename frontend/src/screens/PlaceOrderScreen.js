import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import CheckOutSteps from "../Components/CheckOutSteps";
import { createOrder } from "../actions/orderActions";


const PlaceOrderScreen = ({history}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

    cart.itemsPrice = parseFloat(cart.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0)).toFixed(2);
    cart.shippingPrice = parseFloat(cart.cartItems.reduce((acc,item)=>acc+ 2 * item.qty,0).toFixed(2));
    cart.taxPrice = parseFloat(cart.itemsPrice * 0.02).toFixed(2);
    cart.totalPrice = parseFloat(cart.itemsPrice + cart.shippingPrice+cart.taxPrice).toFixed(2)

  const orderCreate = useSelector(state=> state.orderCreate);
  const {order,success,error} = orderCreate;

  useEffect(()=>{
    if(success){
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  },[history,success])

  const placeOrder = ()=>{
    console.log({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    });
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }))
  }
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
                <p>
                  <strong>Address</strong>
                </p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                Post Code: {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
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
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>


              <ListGroup.Item>
                <Row>
                  <Col>Tax (2%)</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
                      <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                      </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block rounded"
                    disabled={cart.cartItems.lenght === 0}
                    onClick={()=>{placeOrder()}}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
