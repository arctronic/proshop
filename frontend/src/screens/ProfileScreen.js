import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { listMyOrder } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogIn = useSelector((state) => state.userLogin);
  const { userInfo } = userLogIn;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userOrders = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = userOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setMessage("Password didn't match");
    } else {
      //  dispatch update
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {message && <Message variant="info">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader></Loader>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" aria-required>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confPassword" aria-required>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3 rounded">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link
                      to={`/order/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      {item._id}
                    </Link>
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.isPaid ? "Paid" : "Not Paid"}</td>
                  <td>{item.isDelivered ? "Delivered" : "Not Delivered"}</td>
                  <td>{item.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
