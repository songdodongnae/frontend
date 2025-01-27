import './App.css';
import React from 'react';
//import { useNavigate } from 'react-router-dom';
import SocialLoginBtn from './SocialLoginBtn';
import CallbackPage from './CallbackPage';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import ApiTest from './ApiTest';
import MyPage from './MyPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<CallbackPage />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path='/login' element={<SocialLoginBtn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
