import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import EditProfile from './Screens/Edit-Profile';
import {Route, Routes } from 'react-router-dom'


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/upload" element={<FileUploader />}></Route> 
    <Route path="/edit" element={<EditProfile />}></Route> 
    </Routes>
  );
}

export default Router;
