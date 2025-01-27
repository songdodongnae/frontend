import './css/App.css'
import React from 'react';
import SocialLoginBtn from './component/SocialLoginBtn';
import CallbackPage from './page/CallbackPage';
import Main from './page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import ApiTest from './test/ApiTest';
import MyPage from './page/MyPage';

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
