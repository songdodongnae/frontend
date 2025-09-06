import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/SeriesPage4.css";
import { useGet } from "../../hooks/festivals";



export default function PlaceListPage() {

  
  const { data, loading, error, execute: refetch } = useGet('/api/delicious-spots', { currentPage: 1, pageSize: 100 }, true, []);

  const location = useLocation();

  console.log('data', data)
  

  useEffect(() => {
    refetch().then(response => {
      console.log('API Response:', response);
    }).catch(err => {
      console.error('API Error:', err);
    });
  }, []);

  
  // 이전 페이지 경로에 따른 제목 설정
  const getTitle = () => {
    if (location.state?.from === 'theme') {
      return '송도 맛집 테마북';
    }
    else if (location.pathname === '/infoSongdo') {
      return '모든 큐레이션';
    }
    else if (location.pathname === '/edition') {
      return 'TOP 10 큐레이션';
    }
    return '송도 미식 시리즈';
  };



  console.log('data', data);

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="series-page-4">
        <Header />
        <Navigation />
        <div className="theme-book">
          <div className="theme-book-title">송도 맛집 테마북</div>
          <div className="loading">로딩 중...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // 데이터가 없을 때 표시
  if (!data || data.length === 0) {
    return (
      <div className="series-page-4">
        <Header />
        <Navigation />
        <div className="theme-book">
          <div className="theme-book-title">송도 맛집 테마북</div>
          <div className="no-data">데이터를 불러올 수 없습니다.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="series-page-4">
      <Header />
      <Navigation />

      <div className="theme-book">
        <div className="theme-book-title">{getTitle()}</div>
        <div className="theme-book-body">
          {data?.data?.content?.map((place, idx) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}