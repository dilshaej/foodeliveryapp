import React, { useContext, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';


function Auth({insideRegister}) {
    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
    const navigate =useNavigate()
    const [userInputs,setUserInputs]=useState({
      username:"",email:"",password:""
    })
    console.log(userInputs);
  
  
    const handleRegister =async (e)=>{
      e.preventDefault()
      if(userInputs.username && userInputs.email && userInputs.password){
        //api call
  try{
  const result = await registerAPI(userInputs)
  console.log(result);
  if( result.status == 200){
  toast.success(`Welcome ${result.data.username}... please login to explore!!!`)
  setUserInputs({username:"",email:"",password:""})
  setTimeout(()=>{
    navigate('/login')
  },2000);
  }else{
  toast.error(result.response.data)
  setTimeout(()=>{
    setUserInputs({username:"",email:"",password:""})
  
  },2000);
  
  }
  }catch(err){
  console.log(err);
  }
     
  
  }else{
  toast.warning("PLEASE FILL THE FORM COMPLETELY")
      }
    }
  
  
   const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      // api call
      try{
        const result = await loginAPI(userInputs)
        if(result.status==200){
          // store existingUser and token
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.warning(`Welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(() => {
          navigate('/')  
          },2000);
        }else{
          toast.error(result.response.data)
        }
      }catch(err){
        console.log(err);
  
      }
    }else{
      toast.warning("Please fill the foirm completely!!!")
    }
   }
  return (
    <div style={{backgroundColor: 'black', minHeight: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div className='container w-25 p-5 text-white rounded ' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
    <h5 className='fw-bolder mt-2'>Sign {insideRegister?"in":"up"} to your Acoount</h5>
        <Form>
           
           
            <div className='text-black'> 
            {insideRegister &&
                    <FloatingLabel
                         controlId="floatingInputName"
                         label="Username"
                         className="mb-3"
                       >
                         <Form.Control value={userInputs.username}  onChange={e=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="username" />
                       </FloatingLabel>

            }
                    <FloatingLabel
                         controlId="floatingInput"
                         label="Email address"
                         className="mb-3"
                       >
                         <Form.Control value={userInputs.email}  onChange={e=>setUserInputs({...userInputs,email:e.target.value})}   type="email" placeholder="name@example.com" />
                       </FloatingLabel>
                       <FloatingLabel controlId="floatingPassword" label="Password">
                         <Form.Control value={userInputs.password}  onChange={e=>setUserInputs({...userInputs,password:e.target.value})} type="password" placeholder="Password" />
                       </FloatingLabel>
            </div>  
                     
                    {
                  insideRegister ?
                  <div className='mt-3'>
                      <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                      <p>Already Have an Account? Click Here to <Link className='text-info' to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                     <button onClick={handleLogin} className='btn btn-primary'>Login</button>
                      <p>New User? Click Here to <Link className='text-info' to={'/register'}>Register</Link></p>
                    </div>
                    }
        </Form>

      
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth