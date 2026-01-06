import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handlesuccess } from '../utils';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [logininfo, setlogininfo] = useState({
    
    email: '',
    password: ''
  })
  const navigate=useNavigate();  



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copylogininfo = { ...logininfo };
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  }
  const handlelogin = async (e) => {

    e.preventDefault();
    const {  email, password } = logininfo;
    if ( !email || !password) {
      return handleError('all field are required.')

    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(logininfo)

      });
      const result = await response.json();
      const {success, message,jwtToken,name,error}=result;
      if (success){
        handlesuccess(message);
		localStorage.setItem('token',jwtToken);
		localStorage.setItem('loggedInUser',name);

        setTimeout(()=>{

          navigate("/home");

        },1000)
      }
      else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
      console.log(result);

    } catch (err) {
      handleError(err);

    }
  }
  return (
    <div className='container'>
      <h1>login</h1>
      <form onSubmit={handlelogin}>
        
        <div>
          <label htmlFor='email'>email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder='enter your email'
            value={logininfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"

            placeholder='enter your password..'
            value={logininfo.password}

          />
        </div>
        <button type='submit'>Login</button>
        <span>dont have an account </span>
        <Link to="/signup">Signup</Link>
      </form>
      <ToastContainer />
    </div>


  );
}

export default Login;
