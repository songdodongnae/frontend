import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import FestivalCalendar from "../../component/FestivalCalendar.js";
import bookmark from "../../images/festivalBookmark.svg";
import { useGet } from "../../hooks/httpShortcuts";

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
            <div className="flex flex-col justify-center items-center gap-12 mb-[158px]">
                {festivals.map((fes) => (
                    <FestivalCard key={fes.id} festival={fes} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

// FestivalCard 컴포넌트 분리
const FestivalCard = ({ festival }) => {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleBookmarkClick = (e) => {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
        setIsBookmarked(!isBookmarked);
    };

    const handleCardClick = () => {
        navigate(`/festivals/${festival.id}`);
    };

    return (
        <div 
            className="flex w-[960px] items-center cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            onClick={handleCardClick}
        >
            <div className="w-[480px] h-[427px] relative">
                {festival.imageUrl && !imgError ? (
                    <img 
                        className="w-full h-full rounded-tl-[30px] rounded-bl-[30px] object-cover border border-gray-200" 
                        src={festival.imageUrl} 
                        alt={festival.title}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <img
                        className="w-full h-full rounded-tl-[30px] rounded-bl-[30px] object-cover border border-gray-200"
                        src="/noimage.png"
                        alt={festival.title}
                        onError={() => setImgError(true)}
                    />
                )}
                <div 
                    className="flex w-14 h-14 justify-center items-center absolute right-[26px] bottom-[24px] z-50 cursor-pointer transition-all duration-200 hover:scale-110"
                    onClick={handleBookmarkClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={`w-full h-full flex rounded-full relative transition-all duration-200 ${
                        isBookmarked || isHovered 
                            ? 'bg-gray-800 shadow-lg' 
                            : 'bg-white'
                    }`} />
                    <img 
                        className={`absolute right-[7px] top-[7px] transition-all duration-200 ${
                            isBookmarked || isHovered 
                                ? 'opacity-100 scale-110' 
                                : 'opacity-80'
                        }`} 
                        src={bookmark} 
                        alt="bookmark" 
                    />
                </div>
            </div>
            <div className="flex w-[480px] h-[427px] flex-col items-start shrink-0 rounded-tr-[30px] rounded-br-[30px] bg-[#EFEFEF]">
                <div className="flex flex-col justify-center shrink-0 self-stretch pl-[25px] pr-[38px] pt-[25px] pb-[219px] text-[#1C1814] font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%]">
                    {festival.title}
                </div>
                <div className="text-[#1C1814] font-['Noto_Sans_KR'] text-lg font-semibold leading-[140%] px-[38px] pl-[25px] pb-4 break-words">
                    {festival.creatorName}
                </div>
                <div className="text-[#4D4D4D] font-['Noto_Sans_KR'] text-lg font-medium leading-[140%] px-[38px] pl-[25px] pb-[25px]">
                    현재 예정 축제 개
                </div>
            </div>
        </div>
    );
};

export default Festival;