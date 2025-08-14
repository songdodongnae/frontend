import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider import

import LoginPage from './page/LoginPage';
import CallbackPage from './page/CallbackPage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPage/MyPageLayout';
import Profile from './page/MyPage/Profile';
import SavedCuration from './page/MyPage/SavedCuration';
import Creator from './page/MyPage/Creator';
import Inquiry from './page/MyPage/Inquiry';
import Withdraw from './page/MyPage/Withdraw';
import NaviBarPage1 from './page/NaviBar/NaviBarPage1';
import NaviBarPage4 from './page/NaviBar/NaviBarPage4';
import CurationPage from './page/CurationPage';
import CreatorPage from './page/CreatorPage';
import PlaceListPage from './page/places/PlaceListPage';
import PlaceDetailPage from './page/places/PlaceDetailPage';
import CurationList from './page/places/CurationList';


function App() {
  return (
    <AuthProvider> {/* AuthProvider로 앱을 감싸기 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<CallbackPage />} />
          <Route path="/MyPage" element={<MyPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="saved" element={<SavedCuration />} />
            <Route path="creator" element={<Creator />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>



           {/* 맛집 리스트/상세 (id 기반) */}
          <Route path="/places" element={<PlaceListPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/story" element={<NaviBarPage1 />} />

          <Route path="/infoSongdo" element={<CurationList />} />
          <Route path="/edition" element={<CurationList />} />
          <Route path="/festivalList" element={<NaviBarPage4 />} />
          
          <Route path="/curation" element={<CurationPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
