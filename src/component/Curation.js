import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Home.css";
import { useGet } from "../hooks/httpShortcuts";
import bookmark from '../images/bookmark.svg'

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

        <div className="home">
            <div className="home-header">
                <div className="home-title">방금 올라온 <span className="highlight">큐레이션</span></div>
            </div>
            <div className="home-body">


                {data?.data?.content.map((item) => (
                    <div 
                        key={item.id} 
                        className="home-item"

                        onClick={() => navigate(`/places/${item.id}`)}
                        style={{
                            cursor: 'pointer',
                            background: 'gray',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                        }}
                    >
                        <h3>{item.title}</h3>
                        <h4>ID: {item.id}</h4>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}