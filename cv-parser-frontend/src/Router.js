import './App.css';
import Login from './Screens/Login';
import {Route, Routes } from 'react-router-dom'
import ListParseItems from './Screens/ListParseItems';


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/cvparse/cand" element={<ListParseItems />}></Route> 
    </Routes>
  );
}

export default Router;
