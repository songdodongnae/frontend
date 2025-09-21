import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGet } from "../hooks/httpShortcuts";
import charaSong from '../images/song.svg';
import charaDodong from '../images/dodong.svg';
import charaDong from '../images/dong.svg';
import charaNe from '../images/ne.svg';

const CreatorPage = ({ selectedCreator: propSelectedCreator, showArticle = true }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const goToCreator = (creatorName = null) => {
        console.log('Navigating to:', creatorName); // 디버깅용
        if (creatorName) {
            navigate(`/creator?creator=${creatorName}`);
        } else {
            navigate('/creator');
        }
    }

    const goToFestivalDetail = (festivalId) => {
        navigate(`/festivals/${festivalId}`);
    }
    const goToDeliciousSpotDetail = (spotId) => {
        navigate(`/places/${spotId}`);
    }
    const goToCurationDetail = (curationId) => {
        navigate(`/curations/${curationId}`);
    }
    

    // 크리에이터 데이터 정의
    const creators = [
        {
            id: 'song',
            name: '송이',
            image: charaSong,
            backgroundColor: '#FFF4C9',
            description: '매운 음식 좋아하는 송이입니다. 매운맛을 좋아하는 사람들을 위한 맛집을 소개합니다.',
            articleCount: 5,
            idNum: 1
        },
        {
            id: 'do',
            name: '도이',
            image: charaDodong,
            backgroundColor: '#CBE6FF',
            description: '혼자 놀기 만렙 도이입니다. 혼자서도 즐길 수 있는 곳들을 소개합니다.',
            articleCount: 3,
            idNum: 6
        },
        {
            id: 'dong',
            name: '동이',
            image: charaDong,
            backgroundColor: '#71B8FA',
            description: '빵과 커피를 사랑하는 동이입니다. 맛있는 베이커리와 카페를 소개합니다.',
            articleCount: 7,
            idNum:7
        },
        {
            id: 'ne',
            name: '네이',
            image: charaNe,
            backgroundColor: '#FFD9C6',
            description: '운동 마니아 네이입니다. 건강한 라이프스타일을 위한 운동 관련 정보를 공유합니다.',
            articleCount: 4,
            idNum:8
        }
    ];

    
    const selectedCreator = propSelectedCreator 
    ? creators.find(creator => creator.name === propSelectedCreator)?.id
    : searchParams.get('creator');


    // 선택된 크리에이터가 있으면 해당 크리에이터만 필터링
    const displayCreators = selectedCreator 
        ? creators.filter(creator => creator.id === selectedCreator)
        : creators;

    // ... existing code ...
    const { data: creatorData } = useGet('/api/creators', { cursor: 0, pageSize: 10 }, false);
    console.log('creatorData', creatorData, displayCreators[0]);
    
    // selectedCreator가 있을 때만 해당 크리에이터의 ID를 가져와서 API 호출
    const selectedCreatorId = selectedCreator 
        ? displayCreators.find(creator => creator.id === selectedCreator)?.idNum
        : null;
    
    const { data: article } = useGet(
        selectedCreatorId ? `/api/creators/v2/${selectedCreatorId}` : null, 
        {}, 
        !!selectedCreatorId, // selectedCreatorId가 있을 때만 자동 호출
        [selectedCreator] // selectedCreator가 변경될 때마다 재호출
    );
    console.log('article', article);
// ... existing code ...

    return (
        <div>              
            {/* 제목 섹션 */}
            

            <div className="pt-[10vh] flex flex-row justify-center gap-16 mb-96">
                <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {/* 크리에이터 섹션 제목 */}
                    <div className="flex pb-2 ml-2 text-black font-semibold text-2xl leading-tight">
                        {selectedCreator ? `${creators.find(c => c.id === selectedCreator)?.name}의 글` : "송도동네 친구들"}
                    </div>
                    
                    {/* 크리에이터 목록 */}
                    <div className="flex flex-col gap-10 pt-4 mr-8">
                        {displayCreators.map((creator) => (
                            <div 
                                key={creator.id} 
                                className="flex w-96 pt-5 pb-14 flex-col rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                                style={{backgroundColor: creator.backgroundColor}}
                                onClick={()=>goToCreator(creator.id)}
                            >
                                {/* 아티클 개수 컨테이너 */}
                                <div className="flex w-28 h-10 ml-5 justify-center items-center rounded-full bg-white/70">
                                    <div className="flex justify-start text-gray-600 text-center font-normal text-base leading-tight">
                                        아티클 {creator.articleCount}개
                                    </div>
                                </div>
                                
                                {/* 크리에이터 정보 컨테이너 */}
                                <div className="flex flex-col justify-center items-center gap-6 px-16">
                                    {/* 이미지 컨테이너 */}
                                    <div className="flex w-36 h-36 p-1.5 flex-col justify-center items-center gap-0.5 rounded-full bg-white">
                                        <img 
                                            className="w-36 h-36 rounded-full object-cover" 
                                            src={creator.image} 
                                            alt={creator.name}
                                        />
                                    </div>
                                    
                                    {/* 크리에이터 이름 */}
                                    <div className="text-black text-center font-semibold text-lg leading-tight">
                                        {creator.name}
                                    </div>
                                    
                                    {/* 크리에이터 소개 */}
                                    <div className="text-black text-center font-normal text-base leading-tight break-words">
                                        {creator.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 크리에이터가 작성한 글들 - 별도 컨테이너 */}
                    {showArticle && article?.data && (
                        <div className="w-full justify-center max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-lg">                            
                            
                            {/* 축제 글들 */}
                            {article.data.festivalThumbnails && article.data.festivalThumbnails.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-gray-600 text-lg font-medium mb-4">축제</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {article.data.festivalThumbnails.map((festival, idx) => (
                                            <div key={idx} 
                                                 className="bg-gray-50 rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                                                 onClick={()=>goToFestivalDetail(festival.id)}>
                                                <div className="text-base font-medium text-gray-800 truncate">
                                                    {festival.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2">
                                                    {new Date(festival.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* 맛집 글들 */}
                            {article.data.deliciousSpotThumbnails && article.data.deliciousSpotThumbnails.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-gray-600 text-lg font-medium mb-4">맛집</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {article.data.deliciousSpotThumbnails.map((spot, idx) => (
                                            <div key={idx} 
                                                 className="bg-gray-50 rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                                                 onClick={()=>goToDeliciousSpotDetail(spot.id)}
                                                 >
                                                 
                                                <div className="text-base font-medium text-gray-800 truncate">
                                                    {spot.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2">
                                                    {new Date(spot.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* 큐레이션 글들 */}
                            {article.data.curationThumbnails && article.data.curationThumbnails.length > 0 && (
                                <div className="mb-6">
                                    <div className="text-gray-600 text-lg font-medium mb-4">큐레이션</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {article.data.curationThumbnails.map((curation, idx) => (
                                            <div key={idx} 
                                            className="bg-gray-50 rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                                            onClick={()=>goToCurationDetail(curation.id)}>
                                                <div className="text-base font-medium text-gray-800 truncate">
                                                    {curation.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2">
                                                    {new Date(curation.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
            </div>
            
    )
}

export default CreatorPage;