// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Container } from 'react-bootstrap'
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="p-2">
        <Container>
          <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
