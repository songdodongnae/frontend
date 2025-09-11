import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/PlaceDetailpage.css";
import { useGet } from "../../hooks/httpShortcuts";

export default function FestivalDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // PlaceListPage와 동일한 API 호출
  const { data: apiData, loading: apiLoading, error } = useGet(`/api/festivals/${id}`, { currentPage: 1, pageSize: 100 }, true, []);

  console.log('API data:', apiData);
  console.log('Selected place:', place);

  useEffect(() => {
    if (!apiData) return;

    let foundPlace = null;

    if (Array.isArray(apiData)) {
      foundPlace = apiData.find(p => p.id === Number(id));
    } else if (Array.isArray(apiData?.data)) {
      foundPlace = apiData.data.find(p => p.id === Number(id));
    } else if (apiData?.data && typeof apiData.data === 'object') {
      foundPlace = apiData.data;
    } else if (typeof apiData === 'object') {
      foundPlace = apiData;
    }

    if (foundPlace) setPlace(foundPlace);
    setLoading(false);
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
      
      {place.imageUrl ? (
        <img src={place.imageUrl} alt={place.title} className="place-main-image" />
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
            <p className="place-address">{place.address || '주소 정보 없음'}</p>

            <div className="place-ratings">
              <div className="rating-item">
                <span className="rating-label">시작</span>
                <span className="rating-value">
                  {place.startDate || '-'} {place.startTime || ''}
                </span>
              </div>
              <div className="rating-item">
                <span className="rating-label">종료</span>
                <span className="rating-value">
                  {place.endDate || '-'} {place.endTime || ''}
                </span>
              </div>
            </div>

            <div className="place-price">요금: {place.fee ? place.fee : '정보 없음'}</div>

            {place.timeDescription && (
              <div className="detail-item">
                <h3>🕒 운영시간 안내</h3>
                <p>{place.timeDescription}</p>
              </div>
            )}

            <div className="detail-item">
              {place.homePageUrl && (
                <p>
                  🔗 홈페이지: <a href={place.homePageUrl} target="_blank" rel="noreferrer">{place.homePageUrl}</a>
                </p>
              )}
              {place.reservationUrl && (
                <p>
                  📝 예약: <a href={place.reservationUrl} target="_blank" rel="noreferrer">{place.reservationUrl}</a>
                </p>
              )}
            </div>
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
        {Array.isArray(place.festivalImages) && place.festivalImages.length > 0 && (
          <div className="place-images">
            <h2>추가 이미지</h2>
            <div className="image-gallery">
              {place.festivalImages.map((img, index) => {
                const url = typeof img === 'string' ? img : img?.url || img?.imageUrl;
                if (!url) return null;
                return (
                  <img
                    key={index}
                    src={url}
                    alt={`${place.title} 이미지 ${index + 1}`}
                    className="gallery-image"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                );
              })}
            </div>
          </div>
        )}
        
        {/* 운영/연락 정보 */}
        <div className="place-details">
          <div className="detail-item">
            <h3>📞 연락처</h3>
            <p>{place.contact || '정보 없음'}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}