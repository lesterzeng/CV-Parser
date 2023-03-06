import './App.css';
import Login from './Screens/Login';
import FileUploader from './Screens/Upload';
import { Route, Routes } from 'react-router-dom'
import CandidateList from './Screens/CandidateList';


function Router() {
  return (
    <Routes>
    <Route path="/login" element={<Login />}></Route> 
    <Route path="/upload" element={<FileUploader />}></Route> 
    <Route path="/candidatelist" element={<CandidateList />}></Route> 
    </Routes>
  );
}

export default Router;
