import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import {Route, Routes } from 'react-router-dom'
import FileExport from './Screens/FileExport';


function Router() {
  return (
    <Routes>
      <Route path="/export" element={<FileExport/>}></Route>
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/upload" element={<FileUploader />}></Route> 
    </Routes>
  );
}

export default Router;
