import './App.css';
import Login from './Screens/Login';
import Create from './Screens/Create';
import {Route, Routes } from 'react-router-dom'


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/create" element={<Create />}></Route> 
    </Routes>
  );
}

export default Router;
