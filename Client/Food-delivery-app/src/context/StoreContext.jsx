import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { SERVER_URL } from '../Services/serverURL';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Authorization token not found');
      return;
    }

    try {
      await axios.post(`${SERVER_URL}/addcart`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const fetchFoodList = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }
  
      const response = await axios.get(`${SERVER_URL}/list`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
      // Handle the absence of the token here
      if (error.message === 'Authorization token not found') {
        // Redirect the user to the login page or display an error message
        // For example:
        // history.push('/login');
      }
    }
  };
  
  useEffect(() => {
    fetchFoodList();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
