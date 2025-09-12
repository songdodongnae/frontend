import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import "../../css/PlaceDetailpage.css";
import { useGet } from "../../hooks/httpShortcuts";

export default function CurationDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // PlaceListPage와 동일한 API 호출
  const { data: apiData, loading: apiLoading, error } = useGet(`/api/curations/${id}`, { currentPage: 1, pageSize: 100 }, true, []);

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
      
     
    </div>
  );
}