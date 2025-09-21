import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { useGet } from "../../hooks/httpShortcuts";

export default function PlaceDetail() {
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
      <div className="flex flex-col w-full h-full items-center">
        <Header />
        <Navigation />
        <div className="text-center py-16 px-5 text-xl text-gray-600">로딩 중...</div>
        <Footer />
      </div>
    );
  }

  // 장소를 찾을 수 없을 때 표시
  if (!place) {
    return (
      <div className="flex flex-col w-full h-full items-center">
        <Header />
        <Navigation />
        <div className="text-center py-16 px-5 text-xl text-red-600">장소를 찾을 수 없습니다.</div>
        <Footer />
      </div>
    );
  }

  return (
      <div className="mt-20 flex flex-col w-full items-center">
        <Header />
        <Navigation />
        
        {/* 메인 이미지 */}
        {place.thumbnailImageUrl ? (
          <img 
            src={place.thumbnailImageUrl} 
            alt={place.title} 
            className="mx-auto h-[35vh] w-full object-cover shadow-lg" 
          />
        ) : (
          <div 
            className="mx-auto h-[35vh] w-full bg-sky-400 flex items-center justify-center text-gray-500 text-lg shadow-lg"
          >
            이미지 없음
          </div>
        )}
      
        <div className="w-full max-w-4xl mx-auto px-4">
          {/* 헤더 정보 */}
          <div className="mt-10">
            <h6 className="text-2xl font-bold truncate">{place.title}</h6>

            <div className="mt-10 text-sm">
                <span className="text-gray-500">영업시간</span>{' '}
                <span className="text-gray-800 font-medium">{place.startTime}-{place.endTime}</span>
            </div>
            <div className="text-sm">
                <span className="text-gray-500">웨이팅</span>{' '}
                <span className="text-gray-800 font-medium">{place.waiting}</span>
            </div>
            <div className="text-sm">
                <span className="text-gray-500">주차장</span>{' '}
                <span className="text-gray-800 font-medium">{place.parking}</span>
            </div>
            <div className="text-sm">
                <span className="text-gray-500">가격</span>{' '}
                <span className="text-gray-800 font-medium">{place.price}</span>
            </div>
            <div className="text-sm">
                <span className="text-gray-500">메뉴추천</span>{' '}
                <span className="text-gray-800 font-medium">{place.suggestionMenu}</span>
            </div>

            <div className="text-sm">
                <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                {place.description}
                </p>
            </div>

            <div 
              className="mt-10 flex-col w-full h-[60vh] rounded-[12px] border border-gray-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="flex h-3/4 border border-gray-200">
                <div className="w-full h-full">
                <img
                    className="w-full h-full object-cover"
                    src={place.imageUrl || '/noimage.png'}
                    alt={place.title}
                />
                </div>                       
                
            </div>
            <div className="h-1/4">
                <div className="grid grid-cols-4 gap-2 h-full">
                    <div className="w-full h-full bg-gray-100 rounded-md"></div>
                    <div className="w-full h-full bg-gray-100 rounded-md"></div>
                    <div className="w-full h-full bg-gray-100 rounded-md"></div>
                </div>

            </div>
            </div>

            <div className="text-sm">
                
                <p className="mt-10 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                {place.address}
                </p>
            </div>

            
            {/* <p className="place-address">{place.address}</p>
            <div className="place-ratings">
              <div className="rating-item">
                <span className="rating-label">네이버</span>
                <span className="rating-value">⭐ {place.naverRating || 'N/A'}</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">카카오</span>
                <span className="rating-value">⭐ {place.kakaoRating || 'N/A'}</span>
              </div>
            </div> */}
            
        </div>
        
       
        
        
      </div>
      
      
      <Footer />
    </div>
   
  );
}