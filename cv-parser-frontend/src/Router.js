import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import Create from './Screens/Create';
import { Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import ListParseItems from './Screens/ListParseItems';
import Dashboard from './Screens/Dashboard'
import NavBar from './Component/Navbar';
import ListProfileCreated from './Screens/ListProfileCreated';
=======
>>>>>>> 5091d9bbe7085c1306daf834f09d8dcb9ea2fa48
import FileExport from './Screens/FileExport';


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
<<<<<<< HEAD
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/cvparse/cand" element={<ListParseItems />}></Route>
      <Route path="/cvparse/cand/profile" element={<ListProfileCreated />}></Route>
      <Route path="/upload" element={<FileUploader />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/export" element={<FileExport />}></Route>
      <Route path="/export" element={<FileExport />}></Route>
=======
      <Route path="/upload" element={<FileUploader />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/export" element={<FileExport />}></Route>
>>>>>>> 5091d9bbe7085c1306daf834f09d8dcb9ea2fa48
    </Routes>
  );
}

export default Router;
