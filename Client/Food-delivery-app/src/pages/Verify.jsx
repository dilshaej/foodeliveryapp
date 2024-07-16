import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { SERVER_URL } from '../Services/serverURL'

function Verify() {
  const[searchParams,setSearchParams] = useSearchParams()
const navigate = useNavigate()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
// console.log(success,orderId);
// const {url} = useContext(StoreContext)


const verifyPayment = async( ) =>{
  const response = await axios.post(
    `${SERVER_URL}/verify`,{success,orderId})
    if(response.data.success){
navigate('/myorders')
    }else{
      navigate('/')
    }
}
useEffect(()=>{
  verifyPayment()
},[])
  return (
    <>
   
<div >
    <div className='spinner' style={{width:"100px",height:'100px',placeSelf:'center',border:'5px solid',borderTopColor:'red', borderRadius:"50%",animation:'rotate 1s infinite'}}></div>
    
</div>

    </>
  )
}

export default Verify