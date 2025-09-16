import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGet } from "../hooks/httpShortcuts";

export default function Curation() {
    const {data} = useGet('/api/curations', { currentPage: 1, pageSize: 100 }, true, []);
    console.log("data", data?.data?.content)
    const [curation, setCuration] = useState();
    const navigate = useNavigate();

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

        <div className="pt-[30vh] pl-5 pr-[33px] mr-5 h-screen overflow-y-auto">
            <div className="flex justify-start text-left self-start w-full font-['Noto_Sans_KR'] text-xl font-semibold leading-[140%] text-[#333]">
                <div>
                    방금 올라온 <span className="text-blue-600">큐레이션</span>
                </div>
            </div>
            <div className="mt-[3vh] grid grid-cols-1 gap-6 w-full max-w-[960px]">
                {data?.data?.content.map((item) => (
                    <div 
                        key={item.id} 
                        className="cursor-pointer bg-gray-500 rounded-xl p-5 text-white shadow-md [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
                        onClick={() => navigate(`/curations/${item.id}`)}
                    >
                        <h3>{item.title}</h3>
                        <h4>ID: {item.id}</h4>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}