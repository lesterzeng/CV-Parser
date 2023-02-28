import './App.css';
import Login from './Screens/Login';
<<<<<<< HEAD
import FileUploader from './Screens/Upload';
import Create from './Screens/Create';
import { Route, Routes } from 'react-router-dom'
import ListParseItems from './Screens/ListParseItems';
import Dashboard from './Screens/Dashboard'
import NavBar from './Component/Navbar';
import ListProfileCreated from './Screens/ListProfileCreated';
=======
import {Route, Routes } from 'react-router-dom'
>>>>>>> 7769897 (Created basic template for file export route:)
import FileExport from './Screens/FileExport';


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/cvparse/cand" element={<ListParseItems />}></Route>
      <Route path="/cvparse/cand/profile" element={<ListProfileCreated />}></Route>
      <Route path="/upload" element={<FileUploader />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/export" element={<FileExport />}></Route>
      <Route path="/export" element={<FileExport />}></Route>
    </Routes>
  );
}

export default Router;
