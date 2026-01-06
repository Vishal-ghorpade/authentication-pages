import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handlesuccess } from '../utils';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [signupinfo, setsignupinfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate=useNavigate();  



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupinfo = { ...signupinfo };
    copysignupinfo[name] = value;
    setsignupinfo(copysignupinfo);
  }
  const handlesignup = async (e) => {

    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError('all field are required.')

    }
    try {
      const url = "https://authentication-pages-smoky.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signupinfo)

      });
      const result = await response.json();
      const {success, message,error}=result;
      if (success){
        handlesuccess(message);
        setTimeout(()=>{

          navigate("/login");

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
      <h1>Signup</h1>
      <form onSubmit={handlesignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder='enter your name ...'
            value={signupinfo.name}


          />
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder='enter your email'
            value={signupinfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"

            placeholder='enter your password..'
            value={signupinfo.password}

          />
        </div>
        <button type='submit'>Signup</button>
        <span>already have an account </span>
        <Link to="./login">Login</Link>
      </form>
      <ToastContainer />
    </div>


  );
}

export default Signup;
