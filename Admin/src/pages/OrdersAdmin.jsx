import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { SERVER_URL } from '../services/serverURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrdersAdmin() {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${SERVER_URL}/listorders`, {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders: " + error.message);
        }
    }
const handleStatus = async (e,orderId)=>{
// console.log(e,orderId);
const response = await axios.post(`${SERVER_URL}/status`,{
  orderId,
  status:e.target.value
})
if(response.data.success){
  await fetchAllOrders()
}
}
    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <div className='container p-5'>
                <h3>Order Page</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Order Details</th>
                            <th>Price</th>
                            <th>Items</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td><img height={'70px'} src="https://img.freepik.com/free-psd/isolated-cardboard-box_125540-1169.jpg" alt="" /></td>
                                <td>
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.name} x {item.quantity}
                                        </div>
                                    ))}
                                    <div className='mt-3'>
                                        <h6>{order.address.firstName} {order.address.lastName}</h6>
                                        <p>{order.address.street}</p>
                                        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                        <p>{order.address.phone}</p>
                                    </div>
                                </td>
                                <td>${order.amount}</td>
                                <td>{order.items.length}</td>
                                <td>
                                    <Form.Select onChange={(e)=>handleStatus(e,order._id)} value={order.status} aria-label="Floating label select example">
                                        <option value="Food Processing">Food Processing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    );
}

export default OrdersAdmin;
