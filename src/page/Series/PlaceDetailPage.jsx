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

  const { data: apiData, loading: apiLoading, error } = useGet(`/api/delicious-spots/${id}`, { currentPage: 1, pageSize: 100 }, true, []);

  console.log('API data:', apiData);
  console.log('Selected place:', place);

  useEffect(() => {
    if (apiData) {
      // API 데이터에서 해당 ID의 장소 찾기
      
      setPlace(apiData.data);
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
      
      {/* 메인 이미지 */}
      {place.thumbnailImageUrl ? (
        <img src={place.thumbnailImageUrl} alt={place.title} className="place-main-image" />
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
        {/* 헤더 정보 */}
        <div className="place-header">
          <div className="place-info">
            <h1 className="place-title">{place.title}</h1>
            
            <p className="place-address">{place.address}</p>
            <div className="place-ratings">
              <div className="rating-item">
                <span className="rating-label">네이버</span>
                <span className="rating-value">⭐ {place.naverRating || 'N/A'}</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">카카오</span>
                <span className="rating-value">⭐ {place.kakaoRating || 'N/A'}</span>
              </div>
            </div>
            <div className="place-price">가격: {place.price ? `${place.price.toLocaleString()}원` : '정보 없음'}</div>
          </div>
        </div>
        
        {/* 한 줄 설명 */}
        <div className="place-description">
          <h2>한 줄 소개</h2>
          <p>{place.onelineDescription || '설명이 없습니다.'}</p>
        </div>
        
        {/* 상세 설명 */}
        <div className="place-description">
          <h2>상세 설명</h2>
          <p>{place.description || '설명이 없습니다.'}</p>
        </div>
        
        {/* 추가 이미지들 */}
        {place.imageUrls && place.imageUrls.length > 0 && (
          <div className="place-images">
            <h2>추가 이미지</h2>
            <div className="image-gallery">
              {place.imageUrls.map((imageUrl, index) => (
                <img 
                  key={index} 
                  src={imageUrl} 
                  alt={`${place.title} 이미지 ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        )}
        
        {/* 운영 정보 */}
        <div className="place-details">
          <div className="detail-item">
            <h3>🕒 운영시간</h3>
            <p>{place.timeDescription || '정보 없음'}</p>
          </div>
          
          <div className="detail-item">
            <h3>⏰ 대기시간</h3>
            <p>{place.waiting || '정보 없음'}</p>
          </div>
          
          <div className="detail-item">
            <h3>🅿️ 주차</h3>
            <p>{place.parking || '정보 없음'}</p>
          </div>
          
          <div className="detail-item">
            <h3>🍽️ 추천 메뉴</h3>
            <p>{place.suggestionMenu || '정보 없음'}</p>
          </div>
          
          <div className="detail-item">
            <h3>📞 연락처</h3>
            <p>{place.contact || '정보 없음'}</p>
          </div>
          
          {place.instagram && (
            <div className="detail-item">
              <h3>📱 인스타그램</h3>
              <p>{place.instagram}</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}