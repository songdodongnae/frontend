import './css/App.css'
import React from 'react';
import LoginPage from './page/LoginPage';
import CallbackPage from './page/CallbackPage';
import MainPage from './page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import MyPage from './page/MyPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<CallbackPage />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path='/slogin' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
