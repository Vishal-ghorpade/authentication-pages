import React, { useState, useEffect } from 'react';
import { handleError, handlesuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser' || ''));
  }, [])
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handlesuccess('user logout');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }
  const fetchProducts = async () => {
    try {
      const url = "https://authentication-pages-smoky.vercel.app/products";
      const headers = {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
 return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((item, index) => (
              <li key={index}>
                {item.name}: {item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
export default Home;
