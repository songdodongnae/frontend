import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/PlaceDetailpage.css";
import { useGet } from "../../hooks/festivals";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // PlaceListPage와 동일한 API 호출
  const { data: apiData, loading: apiLoading, error } = useGet('/api/delicious-spots', { currentPage: 1, pageSize: 100 }, true, []);

  console.log('API data:', apiData);
  console.log('Selected place:', place);

  useEffect(() => {
    if (apiData?.data?.content) {
      // API 데이터에서 해당 ID의 장소 찾기
      const foundPlace = apiData.data.content.find(p => p.id === parseInt(id));
      if (foundPlace) {
        setPlace(foundPlace);
      }
      setLoading(false);
    }
  }, [apiData, id]);

  // 로딩 중일 때 표시
  if (loading || apiLoading) {
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

  return (
    <div className="series-page-4">
      <Header />
      <Navigation />
      {place.image ? (
        <img src={place.image} alt={place.title || place.name} className="place-main-image" />
      ) : (
        <div 
          className="place-main-image"
          style={{
            backgroundColor: 'skyblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '18px'
          }}
        >
          이미지 없음
        </div>
      )}
      
      <div className="place-detail">
        <div className="place-header">
          <div className="place-info">
            <h1 className="place-title">{place.title || place.name}</h1>
            <p className="place-category">{place.creatorName || place.category}</p>
            <p className="place-address">{place.address}</p>
            <div className="place-rating">⭐ {place.rating || 'N/A'}</div>
          </div>
        </div>
        
        <div className="place-description">
          <h2>장소 소개</h2>
          <p>{place.description || place.content || '설명이 없습니다.'}</p>
        </div>
        
        <div className="place-details">
          <div className="detail-item">
            <h3>연락처</h3>
            <p>{place.phone || '정보 없음'}</p>
          </div>
          <div className="detail-item">
            <h3>운영시간</h3>
            <p>{place.hours || '정보 없음'}</p>
          </div>
          <div className="detail-item">
            <h3>주요 특징</h3>ㅌ
            <ul>
              {/* API 데이터에 따라 메뉴나 특징 정보 표시 */}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}