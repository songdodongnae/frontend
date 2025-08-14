import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/SeriesPage4.css";

export const sampleData = [
  {
    id: 1,
    name: "송도 센트럴파크",
    description: "송도의 대표적인 공원으로, 넓은 잔디밭과 호수가 있는 아름다운 공원입니다.",
    image: "https://picsum.photos/300/200?random=1",
    category: "공원",
    rating: 4.5,
    address: "인천 연수구 송도동"
  },
  {
    id: 2,
    name: "송도 갯벌체험장",
    description: "자연생태를 체험할 수 있는 갯벌체험장으로, 아이들과 함께 방문하기 좋습니다.",
    image: "https://picsum.photos/300/200?random=2",
    category: "체험",
    rating: 4.2,
    address: "인천 연수구 송도동"
  },
  {
    id: 3,
    name: "송도 국제도시",
    description: "미래지향적인 스마트시티로, 첨단 기술이 적용된 현대적인 도시입니다.",
    image: "https://picsum.photos/300/200?random=3",
    category: "도시",
    rating: 4.7,
    address: "인천 연수구 송도동"
  },
  {
    id: 4,
    name: "송도 맛집거리",
    description: "다양한 음식을 즐길 수 있는 맛집들이 모여있는 거리입니다.",
    image: "https://picsum.photos/300/200?random=4",
    category: "음식",
    rating: 4.3,
    address: "인천 연수구 송도동"
  },
  {
    id: 5,
    name: "송도 해변",
    description: "아름다운 해변과 함께 바다를 감상할 수 있는 곳입니다.",
    image: "https://picsum.photos/300/200?random=5",
    category: "자연",
    rating: 4.6,
    address: "인천 연수구 송도동"
  }
];

export default function PlaceListPage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // true로 변경
  const location = useLocation();
  console.log(location);
  
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


  // 샘플 데이터 정의
 

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo(0, 0);
    
    // 샘플 데이터로 초기화
    setData(sampleData);
    setLoading(false); // 데이터 설정 후 로딩 상태 해제
  }, []);

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
          {data.map((place, idx) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}