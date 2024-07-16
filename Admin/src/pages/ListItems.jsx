import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllFoodListAPI, removeFoodListAPI } from '../services/allAPI';
import { SERVER_URL } from '../services/serverURL';

function ListItems() {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        listFood();
    }, []);

    const listFood = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        try {
            const result = await getAllFoodListAPI(reqHeader);
            console.log(result); // Log the result to check its structure
            if (result.status === 200 && result.data.success && Array.isArray(result.data.data)) {
              
                setFoodList(result.data.data);
            } else {
                console.error("Invalid data format returned by getAllFoodListAPI");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteFood = async (foodId)=>{
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        // api call
        const result = await removeFoodListAPI(foodId,reqHeader)
        if(result.status==200){
           
           listFood()
        }else{
          console.log(result);
        }
      }
    }

    return (
        <>
            <div>
                <h3>All Foods List</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    <tbody>
                        {foodList.map(food => (
                            <tr key={food._id}>
                                <td>
                                    <img height={'70px'}  src={`${SERVER_URL}/uploads/${food?.image}`} alt="" />
                                </td>
                                <td>{food.name}</td>
                                <td>{food.category}</td>
                                <td>${food.price}</td>
                                <td><button onClick={()=>handleDeleteFood(food?._id)} className='btn'><i className="fa-solid fa-trash"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    );
}

export default ListItems;
