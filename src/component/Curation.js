import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/httpShortcuts";
import bookmark from "../images/festivalBookmark.svg";

export default function Curation() {
    const {data} = useGet('/api/curations', { currentPage: 1, pageSize: 100 }, true, []);
    console.log("data", data?.data?.content)
    const [curation, setCuration] = useState();
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleBookmarkClick = (e) => {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
        setIsBookmarked(!isBookmarked);
    };

    const [charaName, setCharaName] = useState(['송이', '도동이', '동이', '네이']);

    const goToCuration = () => {
        navigate('/curation')
    }

    
    useEffect(() => {
        // 더미 데이터로 단색 이미지 생성
        const dummyData = Array.from({ length: 5 }, (_, index) => ({
            id: index + 1,
            // 다양한 색상 배열
            color: [
                '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
                '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
            ][index % 15],
            title: `큐레이션 ${index + 1}`,
            description: `매력적인 큐레이션 ${index + 1}입니다.`
        }));
        
        setCuration(dummyData);
    }, []);

    return (

        <div className="flex flex-col h-screen overflow-y-auto sticky pl-5 pr-[33px] mr-5">

            <div className="flex flex-col gap-1 pt-48 items-start">

            <div className="pt-4 mr-5 mb-5 text-black font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] whitespace-nowrap">
                     
                방금 올라온 <span className="text-blue-600">큐레이션</span>
               
            </div> 
            </div>
           
            <div className="mt-2 grid grid-cols-1 gap-6 w-full max-w-[960px]">
                {data?.data?.content.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex 
                        flex-col
                        border border-gray-200                     
                        w-[65vh] rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                        onClick={() => navigate(`/curations/${item.id}`)}
                    >
                        <div className="w-full h-[209px] rounded-t-[30px]"></div>
                        <div className="flex w-full flex-col items-start rounded-b-[30px] bg-gray-200 relative">
                            <div 
                                className="flex w-10 h-10 justify-center items-center absolute right-[10px] bottom-[23px] z-50 cursor-pointer transition-all duration-200 hover:scale-110"
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
                                    className={`absolute right-[1px] top-[1px] transition-all duration-200 ${
                                        isBookmarked || isHovered 
                                            ? 'opacity-100 scale-110' 
                                            : 'opacity-80'
                                    }`} 
                                    src={bookmark} 
                                    alt="bookmark" 
                                />
                            </div>
                            
                            <div className="text-black font-['Noto_Sans_KR'] text-base font-semibold leading-[140%] pt-4 pl-6">
                                {item.title}
                            </div>
                            <div className="text-gray font-['Noto_Sans_KR'] text-[10px] font-normal leading-[140%] mb-4 pt-2 pl-6">
                             {item.createdAt}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}