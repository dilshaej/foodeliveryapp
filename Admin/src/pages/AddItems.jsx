import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../contexts/ContextAPI';
import uploadImg from '../assets/upload_area.jpg'
import { addFoodAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import ListItems from './ListItems';

function AddItems() {
    const navigate =useNavigate()
    const {addResponse,setAddResponse} = useContext(addResponseContext)
    const [preview,setPreview]=useState("")
    const [imageFileStatus,setImageFileStatus]= useState(false)
    const [foodDetails,setFoodDetails] = useState({
      name:"",description:"",price:"" ,image:"",category:""
    })
   
  
    
  
    
    console.log(foodDetails);
  
    useEffect(()=>{
      if(foodDetails.image.type=="image/png" || foodDetails.image.type=="image/jpg" || foodDetails.image.type=="image/jpeg"  ){
        setImageFileStatus(true)
        setPreview(URL.createObjectURL(foodDetails.image))
      }else{
        setPreview(uploadImg)
       setImageFileStatus(false)
       setFoodDetails({...foodDetails,image:""})
      }
    },[foodDetails.image])
  
    const handleAddFood = async ()=>{
      const {name,description,price,image,category} = foodDetails
      if(!name || !description || !price || !image || !category ){
        toast.warning("Please fill the form completely!!!")
      }else{
        
        const reqBody = new FormData()
        reqBody.append("name",name)
        reqBody.append("description",description)
         reqBody.append("price",price)
         reqBody.append("image",image)
         reqBody.append("category",category)
        
  
         const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
           }
          //  api call    
         try{
           const result = await addFoodAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
           setAddResponse(result)
           toast.success("Item added successfully!")
           setFoodDetails({ name:"",description:"",price:"" ,image:"",category:""})
          
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
  console.log(err);
        }
        } 
         
      }
    }
    return (
        <div className='container w-75 d-flex flex-column'>
            <div className='mb-3'>
                <h5>Upload Image</h5>
                <label>
                    <input type="file" style={{ display: 'none' }} onChange={e=>setFoodDetails({...foodDetails,image:e.target.files[0]})} />
                    <img  style={{ height: '100px' }} className='img-fluid' src={preview} alt="" />
                </label>
            </div>
            <div className='mb-3'>
                <h5>Product Name</h5>
                <input value={foodDetails.name} onChange={(e)=>setFoodDetails({...foodDetails,name:e.target.value})} type="text" className='form-control' name='name' placeholder='Type here' />
            </div>
            <div className='mb-3'>
                <h5>Product Description</h5>
                <textarea value={foodDetails.description} onChange={(e)=>setFoodDetails({...foodDetails,description:e.target.value})}  name="description" rows="6" placeholder='Write content here'></textarea>
            </div>
            <div className='d-flex justify-content-between'>
                <h5>Product category</h5>
                <h5>Product Price</h5>
            </div>
            <div className='d-flex justify-content-between mb-3'>
                <select value={foodDetails.category} onChange={(e)=>setFoodDetails({...foodDetails,category:e.target.value})}  name="category" >
                <option value="Select">Select</option>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure veg">Pure veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
                <input value={foodDetails.price} onChange={(e)=>setFoodDetails({...foodDetails,price:e.target.value})}   type="number" name='price' placeholder='$12' />
            </div>
            <div>
                <button onClick={handleAddFood}  className='btn btn-primary'>Add</button>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
    );
}

export default AddItems;
