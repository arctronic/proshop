import React from "react";
import "../bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
const Header = () => {
  const dispatch = useDispatch();
  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;
  const logOutHandler = () => {
    dispatch(logout());
  };
  console.log("userInfo", userInfo);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" CollapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  {" "}
                  <i
                    className="fa fa-shopping-cart"
                    aria-hidden="true"
                  ></i>{" "}
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logOutHandler}>
                    Log Out
                  </NavDropdown.Item>
                  {userInfo.isAdmin && (
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>User List</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  {userInfo.isAdmin && (
                    <LinkContainer to="/admin/itemlist">
                      <NavDropdown.Item>Item List</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  {userInfo.isAdmin && (
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>All Orders</NavDropdown.Item>
                    </LinkContainer>
                  )}
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa fa-user" aria-hidden="true"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
