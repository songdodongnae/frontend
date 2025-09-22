import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import CreatorPage from "../CreatorPage";

import { useGet } from "../../hooks/httpShortcuts";
import { Link } from 'react-router-dom';

export default function Curation() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // PlaceListPage와 동일한 API 호출
  const { data: apiData, loading: apiLoading, error } = useGet(`/api/curations/${id}`, { currentPage: 1, pageSize: 100 }, true, []);
  const [imgError, setImgError] = useState(false);
  console.log('API data:', apiData);
  console.log('Selected place:', place);
  const creator = apiData?.data?.creator?.name;
  console.log('creator', creator)

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
    <div className="w-full pt-[30vh] border-gray-300 border border-gray-200">
      <Header />
      <Navigation />
      
      <div className="flex flex-col gap-2 items-center">
            {place.length > 0 && !imgError ? (
                <img
                  className="w-[40vh] h-[25vh] object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  src={place?.imageUrl}
                  onError={() => setImgError(true)}
                />
              ) : (
                <img
                className="w-[80vh] h-[40vh] object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                src={`/noimage.png`}
                onError={() => setImgError(true)}
              />
            )}

            <h6 className="text-xl font-bold truncate">{place.title}</h6>
            <h5>{place.description}</h5>
            
            {Array.isArray(place.deliciousSpots) && place.deliciousSpots.length > 0 && (
              <div className="mt-6 justify-items-center">
                {place.deliciousSpots.map((item, idx) => (
                <Link key={item.id ?? idx} to={`/places/${item.id ?? idx}`} className="block mb-6">
                    <div
                    className="flex-col w-[100vh] h-[60vh] rounded-[12px] border border-gray-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="flex h-3/4 border border-gray-200">
                        <div className="w-1/2 h-full ">
                        <img
                            className="w-full h-full object-cover"
                            src={item.imageUrl || '/noimage.png'}
                            alt={item.title}
                        />
                        </div>

                        <div className="w-1/2 h-full p-6 flex flex-col items-start gap-2">
                            <h6 className="text-xl font-bold truncate">{item.title}</h6>

                            <div className="text-sm">
                                <span className="text-gray-500">영업시간</span>{' '}
                                <span className="text-gray-800 font-medium">{item.startTime} ~ {item.endTime}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500">웨이팅</span>{' '}
                                <span className="text-gray-800 font-medium">{item.waiting}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500">주차장</span>{' '}
                                <span className="text-gray-800 font-medium">{item.parking}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500">가격</span>{' '}
                                <span className="text-gray-800 font-medium">{item.price}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500">메뉴추천</span>{' '}
                                <span className="text-gray-800 font-medium">{item.suggestionMenu}</span>
                            </div>

                            <div className="text-sm">
                                <span className="text-gray-500">설명</span>
                                <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                                {item.description}
                                </p>
                            </div>
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
                </Link>
                  
                ))}          
                <CreatorPage selectedCreator={creator} showArticle={false}/>
              </div>
            )}

            {Array.isArray(place.festivals) && place.festivals.length > 0 && (
              <div className="mt-6 justify-items-center">
                {place.festivals.map((item, idx) => (
                  <Link key={item.id ?? idx} to={`/festivals/${item.id ?? idx}`} className="block mb-6">
                    <div className="flex-col w-[100vh] h-[60vh] rounded-[12px] border border-gray-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
                      <div className="flex h-full border border-gray-200">
                        
                        <div className="w-1/2 h-full p-6 flex flex-col items-start gap-2">
                          <h6 className="text-xl font-bold truncate">{item.title}</h6>
                          <h6 className="text-sm truncate mb-8">{item.onelineDescription}</h6>
                          {(item.startDate || item.endDate) && (
                            <div className="text-sm">
                              <span className="text-gray-500">일정</span>{' '}
                              <span className="text-gray-800 font-medium">{item.startTime} ~ {item.endTime}</span>
                            </div>
                          )}
                          {item.timeDescription && (
                            <div className="text-sm">
                              <span className="text-gray-500">입장시간</span>{' '}
                              <span className="text-gray-800 font-medium">{item.timeDescription || ''}</span>
                            </div>
                          )}
                          {item.parking && (
                            <div className="text-sm">
                              <span className="text-gray-500">주차장</span>{' '}
                              <span className="text-gray-800 font-medium">{item.parking || ''}</span>
                            </div>
                          )}
                          {item.price && (
                            <div className="text-sm">
                              <span className="text-gray-500">입장료</span>{' '}
                              <span className="text-gray-800 font-medium">{item.price}</span>
                            </div>
                          )}
                          {item.description && (
                            <div className="text-sm">
                              <span className="text-gray-500">설명</span>
                              <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          )}
                          {item.address && (
                            <div className="text-sm">
                              <span className="text-gray-500">주소</span>
                              <p className="mt-1 text-gray-700 whitespace-pre-line break-words leading-relaxed">
                               {item.address}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
         
                    </div>
                  </Link>
                ))}
               <CreatorPage selectedCreator={creator} showArticle={false}/>
               </div>
            )}

    </div>
    <Footer />
    </div>
    
  );
}