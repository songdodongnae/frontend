import './css/App.css'
import React from 'react';
import LoginPage from './page/LoginPage';
import CallbackPage from './page/CallbackPage';
import MainPage from './page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import MyPage from './page/MyPage';
import StroyPage from './page/StoryPage';
import InfoSongdoPage from './page/InfoSongdoPage';
import EditionPage from './page/EditionPage';
import FestivalListPage from './page/FestivalListPage';
import SeriesPage from './page/SeriesPage';
import CurationPage from './page/CurationPage';
import CreatorPage from './page/CreatorPage';
import SeriesPage1 from './page/SeriesPage1';
import SeriesPage2 from './page/SeriesPage2';
import SeriesPage3 from './page/SeriesPage3';
import SeriesPage4 from './page/SeriesPage4';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<CallbackPage />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/story' element={<StroyPage />} />
          <Route path='/infoSongdo' element={<InfoSongdoPage />} />
          <Route path='/edition' element={<EditionPage />} />
          <Route path='/festivalList' element={<FestivalListPage />} />
          <Route path='/series' element={<SeriesPage />} />
          <Route path='/curation' element={<CurationPage />} />
          <Route path='/creator' element={<CreatorPage />} />
          <Route path='/seriesPage1' element={<SeriesPage1 />} />
          <Route path='/seriesPage2' element={<SeriesPage2 />} />
          <Route path='/seriesPage3' element={<SeriesPage3 />} />
          <Route path='/seriesPage4' element={<SeriesPage4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
