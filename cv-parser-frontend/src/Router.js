import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import List from './Screens/List';
import {Route, Routes } from 'react-router-dom'
import TestList from './Screens/TestList';


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/upload" element={<FileUploader />}></Route> 
    <Route path="/list" element={<List />}></Route> 
    <Route path="/testlist" element={<TestList />}></Route> 
    </Routes>
  );
}

export default Router;
