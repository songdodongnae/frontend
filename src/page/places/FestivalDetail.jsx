import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";

import { useGet } from "../../hooks/httpShortcuts";

export default function FestivalDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

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
      {place.imageUrl && imgError ? (
        <img 
          src={place.imageUrl} 
          alt={place.title} 
          className="mx-auto h-[35vh] w-full object-cover shadow-lg" 
        />
      ) : (
        <img
        className="w-full h-[35vh] rounded-tl-[30px] object-cover border border-gray-200"
        src="/noimage.png"
        onError={() => setImgError(true)}
       />
      )}
      
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* 헤더 정보 */}
        <div className="mt-10">
          <h6 className="text-2xl font-bold truncate">{place.title}</h6>

          <div className="mt-10 text-sm">
              <span className="text-gray-500">시작</span>{' '}
              <span className="text-gray-800 font-medium">{place.startDate || '-'} {place.startTime || ''}</span>
          </div>
          <div className="text-sm">
              <span className="text-gray-500">종료</span>{' '}
              <span className="text-gray-800 font-medium">{place.endDate || '-'} {place.endTime || ''}</span>
          </div>
          <div className="text-sm">
              <span className="text-gray-500">요금</span>{' '}
              <span className="text-gray-800 font-medium">{place.fee || '정보 없음'}</span>
          </div>
          <div className="text-sm">
              <span className="text-gray-500">연락처</span>{' '}
              <span className="text-gray-800 font-medium">{place.contact || '정보 없음'}</span>
          </div>
          <div className="text-sm">
              <span className="text-gray-500">주소</span>{' '}
              <span className="text-gray-800 font-medium">{place.address || '주소 정보 없음'}</span>
          </div>

          {/* 운영시간 안내 */}
          {place.timeDescription && (
            <div className="text-sm mt-4">
              <span className="text-gray-500">🕒 운영시간 안내</span>
              <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                {place.timeDescription}
              </p>
            </div>
          )}

          {/* 홈페이지 및 예약 링크 */}
          <div className="text-sm mt-4">
            {place.homePageUrl && (
              <div className="mb-2">
                <span className="text-gray-500">🔗 홈페이지: </span>
                <a 
                  href={place.homePageUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {place.homePageUrl}
                </a>
              </div>
            )}
            {place.reservationUrl && (
              <div>
                <span className="text-gray-500">📝 예약: </span>
                <a 
                  href={place.reservationUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {place.reservationUrl}
                </a>
              </div>
            )}
          </div>

          {/* 한 줄 소개 */}
          {place.onelineDescription && (
            <div className="text-sm mt-6">
              <span className="text-gray-500">한 줄 소개</span>
              <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                {place.onelineDescription}
              </p>
            </div>
          )}

          {/* 상세 설명 */}
          {place.description && (
            <div className="text-sm mt-6">
              <span className="text-gray-500">상세 설명</span>
              <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                {place.description}
              </p>
            </div>
          )}

          {/* 이미지 갤러리 */}
          <div className="mt-10 flex flex-col w-full h-[60vh] rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            <div className="flex h-3/4 border-b border-gray-200">
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={place.imageUrl || '/noimage.png'}
                  alt={place.title}
                />
              </div>                       
            </div>
            <div className="h-1/4 p-2">
              <div className="grid grid-cols-4 gap-2 h-full">
                {Array.isArray(place.festivalImages) && place.festivalImages.slice(0, 3).map((img, index) => {
                  const url = typeof img === 'string' ? img : img?.url || img?.imageUrl;
                  return (
                    <div key={index} className="w-full h-full">
                      {url ? (
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={url}
                          alt={`${place.title} 이미지 ${index + 1}`}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-md"></div>
                      )}
                    </div>
                  );
                })}
                {(!place.festivalImages || place.festivalImages.length < 3) && (
                  <div className="w-full h-full bg-gray-100 rounded-md"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}