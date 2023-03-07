import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import Create from './Screens/Create';
import {Route, Routes } from 'react-router-dom'
import ListParseItems from './Screens/ListParseItems';
import Dashboard from './Screens/Dashboard'
import NavBar from './Component/Navbar';
import ListProfileCreated from './Screens/ListProfileCreated';


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/dashboard" element={<Dashboard />}></Route> 
    <Route path="/cvparse/cand" element={<ListParseItems />}></Route> 
    <Route path="/cvparse/cand/profile" element={<ListProfileCreated />}></Route> 
    <Route path="/upload" element={<FileUploader />}></Route> 
    <Route path="/create" element={<Create />}></Route> 
    </Routes>
  );
}

export default Router;
