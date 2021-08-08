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

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="p-2">
        <Container>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/login" component={LogInScreen} exact/>
          <Route path="/register" component={RegScreen} exact/>
          <Route path="/profile" component={ProfileScreen} exact/>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
