import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { sampleData } from "./PlaceList"; // 공통 데이터 import
import "../../css/PlaceDetailpage.css";

export default function PlaceDetailPage() {
  const { id } = useParams(); // 문자열로 들어옴
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(place)

  useEffect(() => {
    // 공통 데이터에서 해당 ID의 장소 찾기
    const foundPlace = sampleData.find(p => p.id === parseInt(id));
    if (foundPlace) {
      setPlace(foundPlace);
    }
    setLoading(false);
  }, [id]);

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="series-page-4">
        <Header />
        <Navigation />
        <div className="loading">로딩 중...</div>
        <Footer />
      </div>
    );
  }

  // 장소를 찾을 수 없을 때 표시
  if (!place) {
    return (
      <div className="series-page-4">
        <Header />
        <Navigation />
        <div className="error">장소를 찾을 수 없습니다.</div>
        <Footer />
      </div>
    );
  }

  // place가 설정된 후에만 렌더링
  return (
    <div className="series-page-4">
      <Header />
      <Navigation />
      <img src={place.image} alt={place.name} className="place-main-image" />
      
      <div className="place-detail">
        <div className="place-header">
          
          <div className="place-info">
            <h1 className="place-title">{place.name}</h1>
            <p className="place-category">{place.category}</p>
            <p className="place-address">{place.address}</p>
            <div className="place-rating">⭐ {place.rating}</div>
          </div>
        </div>
        
        <div className="place-description">
          <h2>장소 소개</h2>
          <p>{place.description}</p>
        </div>
        
        <div className="place-details">
          <div className="detail-item">
            <h3>연락처</h3>
            <p>{place.phone}</p>
          </div>
          <div className="detail-item">
            <h3>운영시간</h3>
            <p>{place.hours}</p>
          </div>
          <div className="detail-item">
            <h3>주요 특징</h3>
            <ul>
              {/* {place.menu.map((item, index) => (
                <li key={index}>{item}</li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}