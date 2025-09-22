import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import songIcon from '../images/song-icon.svg';
import dodongIcon from '../images/dodong-icon.svg';
import dongIcon from '../images/dong-icon.svg';
import neIcon from '../images/ne-icon.svg';
import { useGet } from "../hooks/httpShortcuts";
import dummy from '../images/story-pic-1.jpg';

const Series = () => {
    const navigate = useNavigate();

    const [series, setSeries] = useState([]);
    const [chara, setChara] = useState([songIcon, dodongIcon, dongIcon, neIcon])
    const [counts, setCounts] = useState({
        festival: 0,
        restaurant: 0,
        curation: 0
      });
    
      const { execute: getFestivalCount } = useGet('/api/festivals', { currentPage: 1, pageSize: 1 }, false);
      const { execute: getRestaurantCount } = useGet('/api/delicious-spots', { currentPage: 1, pageSize: 1 }, false);
      const { execute: getCurationCount } = useGet('/api/curations', { currentPage: 1, pageSize: 1 }, false);
    
      useEffect(() => {
        const fetchCounts = async () => {
          try {
            const [festivalRes, restaurantRes, curationRes] = await Promise.all([
              getFestivalCount(),
              getRestaurantCount(),
              getCurationCount()
            ]);
    
            setCounts({
              festival: festivalRes?.data?.totalElements || 0,
              restaurant: restaurantRes?.data?.totalElements || 0,
              curation: curationRes?.data?.totalElements || 0
            });
          } catch (error) {
            console.error('카운트 조회 실패:', error);
          }
        };
    
        fetchCounts();

        fetch("https://picsum.photos/v2/list?page=1&limit=4")
        .then((response) => response.json())
        .then((data) => setSeries(data))
        .catch((error) => console.error("Error fetching ads:", error));
      }, []);

    return (

        <div className="flex flex-col pl-36 h-screen-md overflow-y-auto sticky series">
            {/* 스크롤바 스타일링 */}
            <style jsx>{`
                .series::-webkit-scrollbar {
                    width: 11px;
                }
                .series::-webkit-scrollbar-track {
                    background: #f8fafc;
                    border-radius: 73px;
                }
                .series::-webkit-scrollbar-thumb {
                    border-radius: 73px;
                    background: #e2e8f0 !important;
                }
                .series::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1 !important;
                }
                /* 다른 스크롤바 스타일 오버라이드 */
                .series::-webkit-scrollbar-thumb:not(.scrollbar-thumb-gray-300) {
                    background: #e2e8f0 !important;
                }
            `}</style>

            
            <div className="flex flex-col w-full gap-1 pt-48 items-end">

            <div className="pt-4 mr-5 mb-5 text-black font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] whitespace-nowrap">
                송도동네 <span className="relative">
                    <span className="relative z-10">시리즈</span>
                    <span className="absolute left-0 right-0 top-1/2 h-[0.35em] bg-[#FFE680] transform -translate-y-[30%] -z-10"></span>
                </span>
            </div> 

                
                <div 
                    className="flex flex-col items-end h-80 w-[35vh] mr-5 rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate('/festival')}
                >
                    
                    <div className="w-full h-[209px]">
                        <img className="w-full h-full object-fill rounded-t-[30px]" src={dummy} alt="festival" />
                    </div>
                    <div className="flex w-full flex-col items-start rounded-b-[30px] bg-[#2E2E2E]">
                        <img className="w-3.5 h-[13.285px] pt-4 pl-6" src={chara[0]} alt="song-icon" />
                        <div className="text-white font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-0.5 pl-6">
                            {8}월의 송도 축제
                        </div>
                        <div className="text-[#EFEFEF] font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] pt-2 pb-4 pl-6">
                            즐길거리 {counts.festival}개
                        </div>
                    </div>
                </div>
                
                <div 
                    className="flex flex-col items-end h-80 w-[35vh] mr-5 rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate('/places', { state: { from: 'places' } })}
                >
                    <div className="w-full h-[209px]">
                        <img className="w-full h-full object-fill rounded-t-[30px]" src={dummy} alt="places" />
                    </div>
                    <div className="flex w-full flex-col items-start rounded-b-[30px] bg-[#2E2E2E]">
                        <img className="w-3.5 h-[13.285px] pt-4 pl-6" src={chara[1]} alt="dodong-icon" />
                        <div className="text-white font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-0.5 pl-6">
                            송도 미식 시리즈
                        </div>
                        <div className="text-[#EFEFEF] font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] pt-2 pb-4 pl-6">
                            송도 맛집 {counts.restaurant}개
                        </div>
                    </div>
                </div>
                
                <div 
                    className="flex flex-col items-end w-3/5 h-80 w-[35vh] mr-5 rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate('/curations', { state: { from: 'trip' } })}
                >
                    <div className="w-full h-[209px]">
                        <img className="w-full h-full object-fill rounded-t-[30px]" src={dummy} alt="curation" />
                    </div>
                    <div className="flex w-full flex-col items-start rounded-b-[30px] bg-[#2E2E2E]">
                        <img className="w-3.5 h-[13.285px] pt-4 pl-6" src={chara[2]} alt="dong-icon" />
                        <div className="text-white font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-0.5 pl-6">
                            송도동네 나들이
                        </div>
                        <div className="text-[#EFEFEF] font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] pt-2 pb-4 pl-6">
                            추천 코스 {counts.curation}개
                        </div>
                    </div>
                </div>
                
                <div 
                    className="flex flex-col items-end h-80 w-[35vh] mr-5 rounded-[30px] transition-all duration-200 ease-in-out hover:shadow-[0px_10px_22.4px_3px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate('/theme', { state: { from: 'theme' } })}
                >
                    <div className="w-full h-[209px]">
                        <img className="w-full h-full object-fill rounded-t-[30px]" src={dummy} alt="theme" />
                    </div>
                    <div className="flex w-full flex-col items-start rounded-b-[30px] bg-[#2E2E2E]">
                        <img className="w-3.5 h-[13.285px] pt-4 pl-6" src={chara[3]} alt="ne-icon" />
                        <div className="text-white font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-0.5 pl-6">
                            송도 맛집 테마북
                        </div>
                        <div className="text-[#EFEFEF] font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] pt-2 pb-4 pl-6">
                            추천 코스 {counts.restaurant}개
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Series;