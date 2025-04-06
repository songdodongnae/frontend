import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Series.css';
import { useEffect, useState } from "react";
import songIcon from '../images/song-icon.svg';
import dodongIcon from '../images/dodong-icon.svg';
import dongIcon from '../images/dong-icon.svg';
import neIcon from '../images/ne-icon.svg';

import dummy from '../images/story-pic-1.jpg';

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

    const goToSeries = (num) => {
        navigate('/seriesPage'+num);
    };

    return (
        <div className="series">
            <div className="series-header">
                <div className="series-title">송도동네 시리즈</div>
            </div>
            {/*   @@@ 시리즈를 api로 할지 결정 후에 주석 처리
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
            */}
            <div className="series-body">
                <div className="series-item" onClick={() => goToSeries(1)}>
                        <div className="series-img-container">
                            <img className="series-thumbnail" src={dummy}/>
                        </div>
                        <div className="series-info-container">
                            <img className="series-chara" src={chara[0]} />
                            <div className="series-item-title">{2}월의 송도 축제</div>
                            <div className="series-contents-num">즐길거리 {3}개</div>
                        </div>
                </div>
                <div className="series-item" onClick={() => goToSeries(2)}>
                        <div className="series-img-container">
                            <img className="series-thumbnail" src={dummy}/>
                        </div>
                        <div className="series-info-container">
                            <img className="series-chara" src={chara[1]} />
                            <div className="series-item-title">송도 미식 시리즈</div>
                            <div className="series-contents-num">송도 맛집 {21}개</div>
                        </div>
                </div>
                <div className="series-item" onClick={() => goToSeries(3)}>
                        <div className="series-img-container">
                            <img className="series-thumbnail" src={dummy}/>
                        </div>
                        <div className="series-info-container">
                            <img className="series-chara" src={chara[2]} />
                            <div className="series-item-title">송도동네 나들이</div>
                            <div className="series-contents-num">추천 코스 {5}개</div>
                        </div>
                </div>
                <div className="series-item" onClick={() => goToSeries(4)}>
                        <div className="series-img-container">
                            <img className="series-thumbnail" src={dummy}/>
                        </div>
                        <div className="series-info-container">
                            <img className="series-chara" src={chara[3]} />
                            <div className="series-item-title">송도 맛집 테마북</div>
                            <div className="series-contents-num">추천 코스 {5}개</div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Series;