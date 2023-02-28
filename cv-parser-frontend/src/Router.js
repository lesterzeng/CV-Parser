import './App.css';
import Login from './Screens/Login';
import { Route, Routes } from 'react-router-dom'
import Test from './Component/UploadFile/UploadFileTest';


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/fileTest" element={<Test />}></Route>
    </Routes>
  );
}

export default Router;
