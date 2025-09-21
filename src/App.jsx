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
import Festival from './page/places/Festival';
import Admin from './page/MyPage/Admin';
import CreatorPage from './page/CreatorPage';
import PlaceList from './page/Series/PlaceList';
import PlaceDetail from './page/Series/PlaceDetail';
import CurationList from './page/places/CurationList';
import Curation from './page/places/Curation';
import FestivalDetail from './page/places/FestivalDetail';
import FestivalList from './page/places/FestivalList';
import SearchPage from './page/SearchPage';

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

          <Route path="/festivals" element={<FestivalList />} />
          <Route path="/festivals/:id" element={<FestivalDetail />} />

           {/* 맛집 리스트/상세 (id 기반) */}

          <Route path="/places" element={<PlaceList />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/theme" element={<PlaceList />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/story" element={<Story />} />

          <Route path="/curations" element={<CurationList />} />
          <Route path="/curations/:id" element={<Curation />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/creator" element={<CreatorPage />} />

          <Route path="/search" element={<SearchPage />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
