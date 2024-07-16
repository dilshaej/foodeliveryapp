import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allAPI';

function Auth({ insideRegister, setUser, setIsAuthorised }) {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userInputs.username && userInputs.email && userInputs.password) {
      try {
        const result = await registerAPI(userInputs);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username}... please login to order food!!!`);
          setUser(result.data); // Set user here
          setUserInputs({ username: "", email: "", password: "" });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          toast.error(result.response.data);
          setTimeout(() => {
            setUserInputs({ username: "", email: "", password: "" });
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("PLEASE FILL THE FORM COMPLETELY");
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userInputs.email && userInputs.password) {
      try {
        const result = await loginAPI(userInputs);
        if (result.status === 200) {
          // Store existingUser and token
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
          sessionStorage.setItem("token", result.data.token);
          setIsAuthorised(true); // Fix here
          setUserInputs({ username: "", email: "", password: "" });
          toast.warning(`Welcome ${result.data.existingUser.username}...`);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("Please fill the form completely!!!");
    }
  }

  return (
    <div>
      <div style={{ width: '100%', height: '100vh', backgroundImage: 'url("https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} className="d-flex justify-content-center align-items-center">
        <div className="container w-50">
          <Link to={'/'}><i className='fa-solid fa-arrow-left '></i></Link>
          <div className="card  shadow p-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className=" align-items-center">
              <div className=" text-white">
                <h1 className='fw-bolder mt-2'> <span style={{ fontFamily: "'Lobster', sans-seri", fontSize: '30px' }}>Fast Food <i className="fa-solid fa-burger"></i></span></h1>
                <h5 className='fw-bolder mt-2'>Sign {insideRegister ? "in" : "up"} to your Account</h5>
                <Form className='text-black'>
                  <div>
                    {insideRegister &&
                      <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                        <Form.Control value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="text" placeholder="username" />
                      </FloatingLabel>
                    }
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                      <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                    </FloatingLabel>
                  </div>
                  {
                    insideRegister ?
                      <div className='mt-3 text-white'>
                        <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                        <p>Already Have an Account? Click Here to <Link className='text-info' to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div className='mt-3 text-white'>
                        <button onClick={handleLogin} className='btn btn-primary'>Login</button>
                        <p>New User? Click Here to <Link className='text-info' to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth;
