import React, { useContext, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { SERVER_URL } from '../Services/serverURL';

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  return (
    <>
      <div className='container'>
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <table className='table mt-5' key={item._id}>
                <tbody>
                  <tr>
                    <td><img height={'70px'} src={`${SERVER_URL}/uploads/${item.image}`} alt="" /></td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{cartItems[item._id]}</td>
                    <td>${item.price * cartItems[item._id]}</td>
                    <td onClick={() => removeFromCart(item._id)}><i className="fa-solid fa-trash"></i></td>
                  </tr>
                </tbody>
              </table>
            );
          }
          return null;
        })}
        <div className='container p-5'>
          <div className="row container">
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
                {/* Use Link instead of anchor tag */}
                <Link className='btn btn-danger' to={'/info'}>PROCEED TO Payout</Link>
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-5">
              <p>If you have a promo code, Enter it here</p>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Promo code"
                  aria-label="Promo code"
                  aria-describedby="basic-addon2"
                />
                <button className='btn btn-dark'>
                  Submit
                </button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
