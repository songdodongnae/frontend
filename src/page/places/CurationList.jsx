import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "../Series/PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/Curation.css";
import { useGet } from "../../hooks/httpShortcuts";

    

export default function CurationList() {
  const {data} = useGet('/api/curations', { currentPage: 1, pageSize: 100 }, true, []);
  console.log("data", data);
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // true로 변경
  const location = useLocation();

  
  // 이전 페이지 경로에 따른 제목 설정
  const getTitle = () => {

    if (location.state?.from === 'trip') {
      return '송도동네 나들이';
    }
    else if (location.state?.from === 'infoSongdo') {
      return '모든 큐레이션';
    }
    else if (location.state?.from ===  'edition') {
      return 'TOP 10 큐레이션';
    }
   
    
    
  };


  // 샘플 데이터 정의
 

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo(0, 0);
    
    // 샘플 데이터로 초기화
    
    setLoading(false); // 데이터 설정 후 로딩 상태 해제
  }, []);

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="curation">
        <Header />
        <Navigation />
        <div className="theme-book">
          <div className="theme-book-title">{getTitle()}</div>
          <div className="loading">로딩 중...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // 데이터가 없을 때 표시
  if (!data || data.length === 0) {
    return (
      <div className="curation">
        <Header />
        <Navigation />
        <div className="theme-book">
          <div className="theme-book-title">{getTitle()}</div>
          <div className="no-data">데이터를 불러올 수 없습니다.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (

    <div className="curation">
      <Header />
      <Navigation />
      <div className="top-banner">
          <div className="top-banner-left">
              <div className="top-banner-title">{getTitle()}</div>
          </div>
          <div className="top-banner-right">
              {data.length > 0 && (
                  <img 
                      src={data[0].image} 
                      alt="Featured" 
                      className="top-banner-image"
                  />
              )}
          </div>
      </div>


      <div className="theme-book">       

        <div className="nav-body">
          {data?.data?.content.map((place, idx) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>


      <Footer />
    </div>
  );
}