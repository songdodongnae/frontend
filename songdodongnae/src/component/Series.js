import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Series.css';
import { useEffect, useState } from "react";
import songIcon from '../images/song-icon.svg';
import dodongIcon from '../images/dodong-icon.svg';
import dongIcon from '../images/dong-icon.svg';
import neIcon from '../images/ne-icon.svg';

const Series = () => {
    const navigate = useNavigate();

    const [series, setSeries] = useState([]);
    const [chara, setChara] = useState([songIcon, dodongIcon, dongIcon, neIcon])

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=4") // 더미 API
            .then((response) => response.json())
            .then((data) => setSeries(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    const goToSeries = () => {
        navigate('/series')
    }

    return (
        <div className="series">
            <div className="series-header">
                <div className="series-title">송도동네 시리즈</div>
                <div className="overall" onClick={() => goToSeries()}>전체보기</div>
            </div>
            <div className="series-body">
                {series.map((srs) => (
                    <div key={srs.id} className="series-item">
                        <div className="series-img-container">
                            <img className="series-thumbnail" src={srs.download_url} alt={srs.title} />
                        </div>
                        <div className="series-info-container">
                            <img className="series-chara" src={chara[srs.id]} />
                            <div className="series-item-title">{srs.author}</div>
                            <div className="series-contents-num">즐길거리 {srs.id}개</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Series;