import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { allOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.allOrders);
  const { loading, error, allOrder } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(allOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  console.log(allOrder)
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Dilevery Status</th>
              <th>Payment Method</th>
              <th>Order Date</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((order) => (
              <tr key={order._id}>
                <LinkContainer to={`/order/${order._id}`}>
                  <td>{order._id}</td>
                </LinkContainer>

                <td>{order.user && order.user.name}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.createdAt.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
