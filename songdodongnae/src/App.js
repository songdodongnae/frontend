import './css/App.css'
import React from 'react';
import LoginPage from './page/LoginPage';
import CallbackPage from './page/CallbackPage';
import MainPage from './page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import MyPage from './page/MyPage';
import NaviBarPage1 from './page/NaviBarPage1';
import NaviBarPage2 from './page/NaviBarPage2';
import NaviBarPage3 from './page/NaviBarPage3';
import NaviBarPage4 from './page/NaviBarPage4';
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
          <Route path='/naviBarPage1' element={<NaviBarPage1 />} />
          <Route path='/naviBarPage2' element={<NaviBarPage2 />} />
          <Route path='/naviBarPage3' element={<NaviBarPage3 />} />
          <Route path='/naviBarPage4' element={<NaviBarPage4 />} />
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
