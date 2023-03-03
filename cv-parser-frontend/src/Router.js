import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import EditForm from './Screens/EditForm';
import List from './Screens/List';
import {Route, Routes } from 'react-router-dom'


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/upload" element={<FileUploader />}></Route> 
    <Route path="/edit/:index" element={<EditForm />}></Route> 
    <Route path="/list" element={<List />}></Route> 
    </Routes>
  );
}

export default Router;
