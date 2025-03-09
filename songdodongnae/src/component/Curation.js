import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Curation.css";
import { useEffect, useState } from "react";
import bookmark from '../images/bookmark.svg'

const Curation = () => {
    const navigate = useNavigate();

    const [curation, setCuration] = useState([]);
    const [charaName, setCharaName] = useState(['송이', '도동이', '동이', '네이']);

    const goToCuration = () => {
        navigate('/curation')
    }

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=10") // 더미 API
            .then((response) => response.json())
            .then((data) => setCuration(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    return (
        <div className="curation">
            <div className="curation-header">
                <div className="curation-title">방금 올라온 큐레이션</div>
                <div className="overall" onClick={() => goToCuration()}>전체보기</div>
            </div>
            <div className="curation-body">
                {curation.map((cu) => (
                    <div key={cu.id} className="curation-item">
                        <div className="curation-img-container">
                            <img className="curation-thumbnail" src={cu.download_url} alt={cu.title} />
                        </div>
                        <div className="curation-info-container">
                            <div className="curation-info-text">
                                <div className="curation-chara">{charaName[(cu.id)%4]}</div>
                                <div className="curation-item-title">{cu.author}</div>
                                <div className="curation-date">2025-03-{cu.id+1}</div>
                            </div>
                            <div className="curation-bookmark">
                                <img className="curation-bookmark-img" src={bookmark} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Curation;