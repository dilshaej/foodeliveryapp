import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { SERVER_URL } from '../Services/serverURL';
import axios from 'axios';

function MyOrders() {
    const [data, setData] = useState([]);
    // const { token } = useContext(StoreContext);
    const token = sessionStorage.getItem('token');
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/userorders`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json' // Specify the desired response format
                }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
       if (token) {
          fetchOrders();
       }
    }, [token]);

    return (
        <div className='container p-5'>
            <h3>My Orders</h3>
            <table className='table'>
                <thead>
                    <tr>
                        {/* <th>Items</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((order, index) => (
                        <tr key={index}>
                            <td><img height={'70px'} src="https://img.freepik.com/free-psd/isolated-cardboard-box_125540-1169.jpg" alt="" /></td>
                            <td>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " X " + item.quantity;
                                } else {
                                    return item.name + " X " + item.quantity + ", ";
                                }
                            })}</td>
                            <td>$12</td> {/* Assuming a fixed price for now */}
                            <td>{order.items.length}</td>
                            <td>${order.amount}.00</td>
                            <td><ul><li>{order.status}</li></ul></td>
                            <td><button onClick={fetchOrders} className='btn btn-danger'>Track Order</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyOrders;
