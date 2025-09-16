import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import songIcon from '../images/song-icon.svg';
import dodongIcon from '../images/dodong-icon.svg';
import dongIcon from '../images/dong-icon.svg';
import neIcon from '../images/ne-icon.svg';

import dummy from '../images/story-pic-1.jpg';

const Series = () => {
    const navigate = useNavigate();

    const [series, setSeries] = useState([]);
    const [chara, setChara] = useState([songIcon, dodongIcon, dongIcon, neIcon])

    useEffect(() => {

        fetch("https://picsum.photos/v2/list?page=1&limit=4")

            .then((response) => response.json())
            .then((data) => setSeries(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    const goToSeries = (num) => {
        navigate('/seriesPage'+num);
    };

    return (

        <div className="pt-[12vh] flex flex-col pl-36 h-screen overflow-y-auto sticky top-[190px] bottom-0">
            {/* 스크롤바 스타일링 */}
            <style jsx>{`
                .series::-webkit-scrollbar {
                    width: 11px;
                }
                .series::-webkit-scrollbar-thumb {
                    border-radius: 73px;
                    background: #D9D9D9;
                }
            `}</style>
{/*             
            <div className="pt-20 flex flex-col gap-12 items-end mr-">
                <div className="pt-10 text-black font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%]">
                    송도동네 <span className="relative">
                        <span className="relative z-10">시리즈</span>
                        <span className="absolute left-0 right-0 top-1/2 h-[0.35em] bg-[#FFE680] transform -translate-y-[30%] -z-10"></span>
                    </span>
                </div>
            </div> */}
            
            {/*   @@@ 시리즈를 api로 할지 결정 후에 주석 처리
            <div className="flex flex-col gap-10 pt-9 items-end">
                {series.map((srs) => (
                    <div key={srs.id} className="flex flex-col items-end w-1/2 h-80 rounded-[30px] transition-all duration-200 ease-in-out hover:shadow-[0px_10px_22.4px_3px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-pointer">
                        <div className="w-full h-[209px]">
                            <img className="w-full h-full object-fill rounded-t-[30px]" src={srs.download_url} alt={srs.title} />
                        </div>
                        <div className="flex w-full flex-col items-start rounded-b-[30px] bg-[#2E2E2E]">
                            <img className="w-3.5 h-[13.285px] pt-4 pl-6" src={chara[srs.id]} />
                            <div className="text-white font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-0.5 pl-6">{srs.author}</div>
                            <div className="text-[#EFEFEF] font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] pt-6 pb-4.5 pl-6">즐길거리 {srs.id}개</div>
>>>>>>> Stashed changes
                        </div>
                    </div>
                ))} 
            </div>
            */}

            
            
            <div className="flex flex-col w-full gap-1 pt-9 items-end">

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
                            즐길거리 {3}개
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
                            송도 맛집 {21}개
                        </div>
                    </div>
                </div>
                
                <div 
                    className="flex flex-col items-end w-3/5 h-80 w-[35vh] mr-5 rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate('/curation', { state: { from: 'trip' } })}
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
                            추천 코스 {5}개
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
                            추천 코스 {5}개
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Series;