import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import FestivalCalendar from "../../component/FestivalCalendar.js";
import bookmark from "../../images/festivalBookmark.svg";
import { useGet } from "../../hooks/httpShortcuts";
import {useLocation} from 'react-router-dom';


const Festival = () => {
    const { data, loading, error } = useGet(
        '/api/festivals',
        { currentPage: 1, pageSize: 10 },
        true, // 자동 호출
        [], // 의존성 배열
        false // 인증 없이 호출
    );

    const festivals = data?.data?.content || [];

    console.log("f", festivals);
    
    if (loading) {
        return (
            <div className="flex flex-col items-center">
                <Header />
                <Navigation />
                <FestivalCalendar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-gray-500">로딩 중...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center">
                <Header />
                <Navigation />
                <FestivalCalendar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
                </div>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center">
            <Header />
            <Navigation />
            <FestivalCalendar />
            <div className="flex w-[110vh] flex-col justify-center items-center gap-12 mb-[158px]">
                {festivals.map((fes) => (
                    <FestivalCard key={fes.id} activeTab={fes} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

// FestivalCard 컴포넌트 분리
export const FestivalCard = ({ activeTab, topLabel }) => {

    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const handleBookmarkClick = (e) => {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
        setIsBookmarked(!isBookmarked);
    };

    
    const handleCardClick = () => {
        const seg = location.pathname.split('/')[1]; // 첫 세그먼트
        const base =
            seg === 'festival' ? 'festivals' :
            seg === 'theme' ? 'places' :
            seg || '';
        navigate(`/${base}/${activeTab.id}`);
    };

    return (
        <div 
            className="flex w-full items-center h-[25vh] rounded-[30px] cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            onClick={handleCardClick}
        >
            <div className="w-1/3 h-full relative">
                {activeTab?.imageUrl && imgError ? (
                    <img 
                        className="w-full h-full object-cover border border-gray-200" 
                        src={activeTab.imageUrl} 
                        alt={activeTab?.title}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <img
                        className="w-full h-full rounded-[30px] object-cover border border-gray-200"
                        src="/noimage.png"
                        alt={activeTab?.title}
                        onError={() => setImgError(true)}
                    />
                )}
                <div 
                    className="flex w-10 h-10 justify-center items-center absolute right-[20px] bottom-[20px] z-50 cursor-pointer transition-all duration-200 "
                    onClick={handleBookmarkClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={`w-full h-full flex rounded-full relative transition-all duration-200 ${
                        isBookmarked || isHovered 
                            ? 'bg-gray-800' 
                            : ''
                    }`} />
                    <img 
                        className={`absolute transition-all duration-200 ${
                            isBookmarked || isHovered 
                                ? 'opacity-100 scale-110' 
                                : 'opacity-80'
                        }`} 
                        src={bookmark} 
                        alt="bookmark" 
                    />
                </div>
            </div>
            <div className="flex w-2/3 h-full flex-col items-start shrink-0 bg-white-100">
                {topLabel && (
                  <div className="px-[25px] pt-[20px] text-[#6B7280] text-sm font-semibold"> {topLabel} </div>
                )}
                
                <div className="flex flex-col justify-center shrink-0 self-stretch pl-[25px] pr-[38px] pt-[25px] pb-[10vh] text-[#1C1814] font-['Noto_Sans_KR'] text-lg font-semibold leading-[140%]">
                    {activeTab?.title}
                </div>
                <div className="text-[#1C1814] font-['Noto_Sans_KR'] text-md leading-[140%] px-[38px] pl-[25px] pb-8 break-words">
                    {activeTab?.creatorName}
                </div>
            </div>
        </div>
    );
};

export default Festival;