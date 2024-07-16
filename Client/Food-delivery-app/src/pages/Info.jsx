import React, { useContext, useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import { SERVER_URL } from '../Services/serverURL';
import axios from 'axios';

function Info() {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('deliveryInfo');
    return storedData ? JSON.parse(storedData) : {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
    };
  });
  const [formFilled, setFormFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const token = sessionStorage.getItem('token');
  const existingUser = JSON.parse(sessionStorage.getItem('existingUser'));
  const userId = existingUser ? existingUser._id : null;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async () => {
    try {
        if (!token) {
            console.error('Authorization token not found');
            return;
        }

        if (!userId) {
            console.error('User ID is null');
            return;
        }

        const items = Object.keys(cartItems).map(itemId => ({
            _id: itemId,
            // name: cartItems[itemId].name,
            // price: cartItems[itemId].price,
            quantity: cartItems[itemId] // Make sure quantity is included
        }));
console.log(cartItems);
        const orderData = {
            items: items,
            totalAmount: getTotalCartAmount(),
            deliveryInfo: data,
            userId: userId,
        };

        console.log(orderData);

        const response = await axios.post(
            `${SERVER_URL}/place`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('Response from server:', response); // Log the response from the server

        // Redirect to Stripe checkout page
        window.location.href = response.data.session_url;
    } catch (error) {
        console.error('Error placing order:', error);
        if (error.response) {
            console.log('Server Response Data:', error.response.data);
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage('An error occurred while placing the order.');
        }
    }
};

  
  useEffect(() => {
    console.log(data);
    setFormFilled(Object.values(data).every(field => field.trim() !== ''));
  }, [data]);

  return (
    <>
      <div className='container '>
        <div className="row p-5">
          <div className="col-lg-5">
            <h3>Delivery Information</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
              <Row className="g-2 mb-3">
                <Col md>
                  <FloatingLabel controlId="firstName" label="First name">
                    <Form.Control required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="lastName" label="Last name">
                    <Form.Control required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
                  </FloatingLabel>
                </Col>
              </Row>
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel
                controlId="street"
                label="Street"
                className="mb-3"
              >
                <Form.Control required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
              </FloatingLabel>
              <Row className="g-2 mb-3">
                <Col md>
                  <FloatingLabel controlId="city" label="City">
                    <Form.Control required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="state" label="State">
                    <Form.Control required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="g-2 mb-3">
                <Col md>
                  <FloatingLabel controlId="zipcode" label="Zip code">
                    <Form.Control required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="country" label="Country">
                    <Form.Control required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
                  </FloatingLabel>
                </Col>
              </Row>
              <FloatingLabel
                controlId="phone"
                label="Phone"
                className="mb-3"
              >
                <Form.Control required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
              </FloatingLabel>
            </Form>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-5">
            <h3>Cart Totals</h3>
            <div className="display-flex justify-content-between;">
              <div>
                <p>Subtotal: <span style={{ marginLeft: '290px' }}>${getTotalCartAmount()}</span></p>
                <hr />
                <p>Delivery Fee:<span style={{ marginLeft: '266px' }} > ${getTotalCartAmount() === 0 ? 0 : 2}</span></p>
                <hr />
                <p>Total:<span style={{ marginLeft: '315px' }}> ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</span></p>
              </div>
              <button className='btn btn-danger' onClick={placeOrder} disabled={!formFilled || !userId}>Proceed to payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
