import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
// import Order from './pages/Verify';
import Auth from './pages/Auth';
import Info from './pages/Info';
import Header from './components/Header';
import Verify from './pages/Verify';
import MyOrders from './pages/MyOrders';
import Footer from './components/Footer';
function App() {
  const [user, setUser] = useState(null);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Header user={user} setShowLogin={setShowLogin} clearCartOnLogout={() => {}} />
      {showLogin && (
        <Auth setUser={setUser} setIsAuthorised={setIsAuthorised} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/info" element={<Info />} />
        {/* Pass setIsAuthorised as a prop */}
        <Route path="/register" element={<Auth setUser={setUser} setIsAuthorised={setIsAuthorised} insideRegister />} />
        {/* Pass setUser and setIsAuthorised as props */}
        <Route path="/login" element={<Auth setUser={setUser} setIsAuthorised={setIsAuthorised} />} />
        <Route path="/myorders" element={<MyOrders />} />


      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
