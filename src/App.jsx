import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider import

import LoginPage from './page/LoginPage';
import CallbackPage from './page/CallbackPage';
import MainPage from './page/MainPage';

import MyPageLayout from './page/MyPage/MyPageLayout';
import Profile from './page/MyPage/Profile';
import Inquiry from './page/MyPage/Inquiry';
import Withdraw from './page/MyPage/Withdraw';

import Story from './page/places/Story';
import Festival from './page/Series/Festival';
import Admin from './page/MyPage/Admin';
import CreatorPage from './page/CreatorPage';
import PlaceList from './page/Series/PlaceList';
import PlaceDetailPage from './page/Series/PlaceDetailPage';


import CurationList from './page/places/CurationList';
import TestFestival from './test/TestFestival';


function App() {
  return (
    <AuthProvider> {/* AuthProvider로 앱을 감싸기 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<CallbackPage />} />
        

          <Route path="/mypage" element={<MyPageLayout />}>
            <Route path="admin" element={<Admin />} />
            <Route path="profile" element={<Profile />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>

          <Route path="/test-festival" element={<TestFestival />} />

           {/* 맛집 리스트/상세 (id 기반) */}

          <Route path="/places" element={<PlaceList />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/theme" element={<PlaceList />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/story" element={<Story />} />

          <Route path="/curation" element={<CurationList />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/creator" element={<CreatorPage />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
