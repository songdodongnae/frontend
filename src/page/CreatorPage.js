import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";

import { useNavigate } from "react-router-dom";

import '../css/CreatorPage.css';

import charaSong from '../images/song.svg';
import charaDodong from '../images/dodong.svg';
import charaDong from '../images/dong.svg';
import charaNe from '../images/ne.svg';

const CreatorPage = () => {
    const navigate = useNavigate();

    const [creOther, setcreOther] = useState([]);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=10") // 더미 API
            .then((response) => response.json())
            .then((data) => setcreOther(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);
/*
    const goTocreator-other = (num) => {
        navigate('/creator-otherPage'+num);
    };*/

    return (
        <div>
            <Header />
            <Navigation /> 
            <div className="creator-title-text">
                <div className="creator-title-text-1">크리에이터</div>
                <div className="creator-title-text-2">관심있는 크리에이터의 글을 읽어보세요.</div>
            </div>
            <div className="creator-page-body">
                <div className="creator-mascotte">
                    <div className="creator-mascotte-title">
                        <div className="creator-mascotte-title-text">송도동네 친구들</div>
                    </div>
                    <div className="creator-mascotte-body">
                        <div className="creator-item" style={{backgroundColor: '#FFF4C9'}}>
                            <div className="creator-article-container">
                                <div className="creator-article-num">아티클 {0}개</div>
                            </div>
                            <div className="creator-info-container">
                                <div className="creator-img-container">
                                    <img className="creator-thumbnail" src={charaSong}/>
                                </div>
                                <div className="creator-item-title">송이</div>
                                <div className="creator-item-intro">크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 </div>
                            </div>
                        </div>
                        <div className="creator-item" style={{backgroundColor: '#CBE6FF'}}>
                            <div className="creator-article-container">
                                <div className="creator-article-num">아티클 {0}개</div>
                            </div>
                            <div className="creator-info-container">
                                <div className="creator-img-container">
                                    <img className="creator-thumbnail" src={charaDodong}/>
                                </div>
                                <div className="creator-item-title">도동이</div>
                                <div className="creator-item-intro">크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 </div>
                            </div>
                        </div>
                        <div className="creator-item" style={{backgroundColor: '#71B8FA'}}>
                            <div className="creator-article-container">
                                <div className="creator-article-num">아티클 {0}개</div>
                            </div>
                            <div className="creator-info-container">
                                <div className="creator-img-container">
                                    <img className="creator-thumbnail" src={charaDong}/>
                                </div>
                                <div className="creator-item-title">동이</div>
                                <div className="creator-item-intro">크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 </div>
                            </div>
                        </div>
                        <div className="creator-item" style={{backgroundColor: '#FFD9C6'}}>
                            <div className="creator-article-container">
                                <div className="creator-article-num">아티클 {0}개</div>
                            </div>
                            <div className="creator-info-container">
                                <div className="creator-img-container">
                                    <img className="creator-thumbnail" src={charaNe}/>
                                </div>
                                <div className="creator-item-title">네이</div>
                                <div className="creator-item-intro">크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 크리에이터 소개 </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="creator-others">
                    <div className="creator-others-title">
                        <div className="creator-others-title-text">송도동네 친구들</div>
                        <div className="overall">전체보기</div>
                    </div>
                    <div className="creator-others-body">
                        {creOther.map((cro) => (
                            <div key={cro.id} className="creator-item">
                                <div className="creator-article-container">
                                    <div className="creator-article-num">아티클 {cro.id}개</div>
                                </div>
                                <div className="creator-info-container">
                                    <div className="creator-img-container">
                                        <img className="creator-thumbnail" src={cro.download_url} alt={cro.title} />
                                    </div>
                                    <div className="creator-item-title">{cro.author}</div>
                                    <div className="creator-item-intro">{cro.author}{cro.author}{cro.author}{cro.author}{cro.author}{cro.author}{cro.author}</div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div> */}
            </div>
            
            <Footer />
        </div>
    )
}

export default CreatorPage;