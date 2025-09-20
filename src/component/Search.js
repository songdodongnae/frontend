import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGet } from "../hooks/httpShortcuts";

export default function Search() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    
    // URL 파라미터에서 검색어 가져오기
    const { data, loading, error } = useGet(
        '/api/search/summary', 
        { query }, 
        !!query, // query가 있을 때만 자동 호출
        [query] // query가 변경될 때마다 재호출
    );

    console.log("검색 결과:", data);
    
    const festivalList = data?.data?.festivalResDtoList || [];
    const deliciousSpotList = data?.data?.deliciousSpotResDtos || [];
    const curationList = data?.data?.curationResDtos || [];

    // 축제 상세 페이지로 이동
    const goToFestivalDetail = (festivalId) => {
        navigate(`/festivals/${festivalId}`);
    };

    // 맛집 상세 페이지로 이동
    const goToDeliciousSpotDetail = (spotId) => {
        navigate(`/places/${spotId}`);
    };

    // 큐레이션 상세 페이지로 이동
    const goToCurationDetail = (curationId) => {
        navigate(`/curations/${curationId}`);
    };

    return (
        <div className="w-[120vh] flex">
            {/* 왼쪽 상단 - 검색 결과 제목 */}
            <div className="w-1/3 pr-12">
                {query && (
                    <div className="sticky top-0">
                        <h1 className="text-2xl font-bold text-gray-800">
                            검색 결과
                        </h1>
                        <p className="text-gray-600 mt-1">
                            "{query}"에 대한 검색 결과입니다
                        </p>
                    </div>
                )}
            </div>

            {/* 오른쪽 - 검색 결과 내용 */}
            <div className="w-2/3">
                {loading && <div>검색 중...</div>}
                
                {query && data && (
                    <div>
                        <h2>축제 ({festivalList.length})</h2>
                        {festivalList.map(festival => (
                            <div 
                                key={festival.id} 
                                className="border p-4 mb-2 cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                                onClick={() => goToFestivalDetail(festival.id)}
                            >
                                <h3 className="font-bold text-lg hover:text-blue-600">
                                    {festival.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    생성일: {new Date(festival.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        
                        <h2>맛집 ({deliciousSpotList.length})</h2>
                        {deliciousSpotList.map(spot => (
                            <div 
                                key={spot.id} 
                                className="border p-4 mb-2 cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                                onClick={() => goToDeliciousSpotDetail(spot.id)}
                            >
                                <h3 className="font-bold text-lg hover:text-blue-600">
                                    {spot.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    생성일: {new Date(spot.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        
                        <h2>큐레이션 ({curationList.length})</h2>
                        {curationList.map(curation => (
                            <div 
                                key={curation.id} 
                                className="border p-4 mb-2 cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                                onClick={() => goToCurationDetail(curation.id)}
                            >
                                <h3 className="font-bold text-lg hover:text-blue-600">
                                    {curation.title}
                                </h3>
                                <p className="text-sm text-gray-500">타입: {curation.type}</p>
                            </div>
                        ))}
                    </div>
                )}

                {query && !loading && data && festivalList.length === 0 && deliciousSpotList.length === 0 && curationList.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">검색 결과가 없습니다.</p>
                    </div>
                )}

                {!query && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">검색어를 입력해주세요.</p>
                    </div>
                )}
            </div>
        </div>
    );
}