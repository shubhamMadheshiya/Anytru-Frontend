import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import { Routes, Route, Navigate } from "react-router-dom"
import Chat from './Components/Chat';
import { useState } from 'react';
import Register from './Components/Register';

function App() {
   const [token, setToken] = useState(localStorage.getItem("token"));
   
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/chat"
          element={
            // token ? 
            <Chat /> 
            // : <Navigate to="/login" 
            // />
            }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
