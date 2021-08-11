import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LogInScreen from "./screens/LogInScreen";
import RegScreen from './screens/RegScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="p-2">
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/payment" component={PaymentScreen}/>
          <Route path="/placeOrder" component={PlaceOrderScreen}/>
          <Route path="/login" component={LogInScreen} exact/>
          <Route path="/register" component={RegScreen} exact/>
          <Route path="/profile" component={ProfileScreen} exact/>
          <Route path="/shipping" component={ShippingScreen}/>        
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
