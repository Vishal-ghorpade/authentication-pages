
import './App.css';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { Routes, Route, Navigate } from 'react-router-dom';

 function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const privateRoute=({element})=>{
return isAuthenticated?element:<navigate to="/login"/>
  }
  
  return (
    <div className="App">
      <refreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>

        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Home' element ={<privateRoute elements={<home/>}/>}/>
      </Routes>
    </div>
  );
}
export default App;
