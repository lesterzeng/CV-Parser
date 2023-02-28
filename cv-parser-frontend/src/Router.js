import './App.css';
import Login from './Screens/Login';
import {Route, Routes } from 'react-router-dom'
import FileExport from './Screens/FileExport';


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/export" element={<FileExport/>}></Route>
    </Routes>
  );
}

export default Router;
