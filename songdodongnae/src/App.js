import './App.css';
import React from 'react';
//import { useNavigate } from 'react-router-dom';
import SocialLoginBtn from './SocialLoginBtn';
import CallbackPage from './CallbackPage';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import ApiTest from './ApiTest';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<ApiTest />} />
          <Route path="/auth" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
