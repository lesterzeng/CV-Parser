import './App.css';
import Login from './Screens/Login';
import {Route, Routes } from 'react-router-dom'


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    </Routes>
  );
}

export default Router;
