import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/PlaceList.css";
import { useGet } from '../../hooks/httpShortcuts';
import { FestivalCard } from '../places/Festival';


export default function PlaceList() {
  const location = useLocation();

  const activeTab = location.state?.from==='festivals' ? 'festivals' : 'delicious-spots';
  
  const { data, loading, error, execute: refetch } = useGet(`/api/${activeTab}`, { currentPage: 1, pageSize: 100 }, true, []);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    return { id: currentMonth, name: `${currentMonth}월` };
  });

  console.log('data', data)

  
  // 이전 페이지 경로에 따른 제목 설정
  const getTitle = () => {
   
    if (location.state?.from === 'theme') {
      return '송도 맛집 테마북';
    }
    else if (location.state?.from === 'festivals'){
      if (selectedMonth) {
        return `${selectedMonth.id}월의 송도동네 축제 일정입니다`;
      }
      return '월을 선택해주세요';
    }
    
    return '송도 미식 시리즈';
  };

  // 월 선택 핸들러
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // 샘플 데이터 정의
 

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo(0, 0);
    
  }, []);

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="series-page">
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
      <div className="series-page">
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
    <div className="series-page">
      <Header />
      <Navigation />     

      <div className="theme-book">
        
        <div className="theme-book-title">{getTitle()}</div>        
        
        <div className="theme-book-body">
          {data?.data?.content?.map((place, idx) => (
            <FestivalCard key={place.id} activeTab={place} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}