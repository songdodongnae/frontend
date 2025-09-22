import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/httpShortcuts";
import bookmark from "../images/festivalBookmark.svg";

export default function Curation() {
    const {data} = useGet('/api/curations', { currentPage: 1, pageSize: 100 }, true, []);
    console.log("data", data?.data?.content)
    const [curation, setCuration] = useState();
    const navigate = useNavigate();
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
	const [hoveredId, setHoveredId] = useState(null);
	const [imgError, setImgError] = useState(false);
	const content = data?.data?.content;

	const handleBookmarkClick = (e, id) => {
		e.stopPropagation();
		setBookmarkedIds(prev => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

    const [charaName, setCharaName] = useState(['송이', '도동이', '동이', '네이']);

    

    return (

        <div className="flex flex-col h-[120vh] overflow-y-auto sticky pl-5 pr-[33px] mr-5">

            <div className="flex flex-col gap-1 pt-48 items-start">

            <div className="pt-4 mr-5 mb-5 text-black font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] whitespace-nowrap">
                     
                방금 올라온 <span className="text-blue-600">큐레이션</span>
               
            </div> 
            </div>
           
            <div className="mt-2 grid grid-cols-1 gap-6 w-full max-w-[960px]">
                {content?.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex 
                        flex-col
                        border border-gray-200                     
                        w-[65vh] rounded-[30px] transition-all duration-200 ease-in-out hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                        onClick={() => navigate(`/curations/${item.id}`)}
                    >
                        <div className="w-full h-[209px] rounded-t-[30px]">

                        {content.length > 0 && !imgError ? (
                            <img
                                className="object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                                src={content[0]?.imageUrl}
                                onError={() => setImgError(true)}
                            />
                            ) : (
                            <img
                            className="object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                            src={`/noimage.png`}
                            onError={() => setImgError(true)}
                            />
                        )}

                        </div>
                        <div className="flex w-full flex-col items-start rounded-b-[30px] bg-gray-200 relative">
							<div 
								className="flex w-10 h-10 justify-center items-center absolute right-[10px] bottom-[23px] z-50 cursor-pointer transition-all duration-200 hover:scale-110"
								onClick={(e) => handleBookmarkClick(e, item.id)}
								onMouseEnter={() => setHoveredId(item.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								{(() => {
									const isActive = bookmarkedIds.has(item.id) || hoveredId === item.id;
									return (
										<>
											<div className={`w-full h-full flex rounded-full relative transition-all duration-200 ${isActive ? 'bg-gray-800 shadow-lg' : 'bg-white'}`} />
											<img 
												className={`absolute top-[1px] transition-all duration-200 ${isActive ? 'opacity-100 scale-110' : 'opacity-80'}`} 
												src={bookmark} 
												alt="bookmark" 
											/>
										</>
									);
								})()}
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