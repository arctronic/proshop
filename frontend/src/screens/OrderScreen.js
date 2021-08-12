import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConst";

const OrderScreen = ({ match }) => {
  const orderID = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;


  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: sucessDeliver } = orderDeliver;

  console.log(order);
  useEffect(() => {
    dispatch(getOrderDetails(orderID));
    if(sucessDeliver){
      dispatch({type: ORDER_DELIVER_RESET});
      dispatch(getOrderDetails(orderID))
    }
  }, [orderID, dispatch,sucessDeliver]);

  console.log("From OrderScreeen", order);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name: </strong>
              {order.user.name}
              <br></br>
              <a
                href={`mailto:${order.user.email}`}
                style={{ textDecoration: "none" }}
              >
                E-mail: {order.user.email}
              </a>
              <br></br>
              <strong></strong>
              <p>
                <strong>Address</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                Post Code: {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.deliveredAt.split('T')[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt.split('T')[0]}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none" }}
                          >
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax (2%)</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item> */}
              <ListGroup.Item>
                {userInfo.isAdmin && (
                  <Row>
                    <Button
                      type="button"
                      className="btn-block rounded"
                      disabled={order.orderItems.lenght === 0}
                      onClick={deliverHandler}
                    >
                      Delivered
                    </Button>
                  </Row>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
