import React from "react";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import '../../css/NaviBarPage1.css';
import storyPic1 from '../../images/story-pic-1.jpg';

const NaviBarPage1 = () => {
    return (
        <div className="story-page">
            <Header />
            <Navigation />
            
            <div className="story-body">
                {/* SNS 섹션 */}
                <div className="story-sns">
                   
                    <div className="story-sns-contents">
                        <div className="story-sns-item">
                            <div className="story-sns-img-container">
                                {/* <img className="story-sns-thumbnail" alt="송도동네 인스타그램" /> */}
                            </div>
                            <div className="story-sns-info-container">
                                <div className="story-sns-item-title">
                                    송도동네 인스타그램
                                </div>
                                <div className="story-sns-contents-num">
                                    최신 소식과 이야기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 메인 콘텐츠 영역 */}
                <div className="story-main">
                    <div className="story-main-title">
                        송도동네 이야기
                    </div>

                    <div className="story-para">
                        송도동네 이야기 (송도는 원래 해안선이 넓고 자연경관이 아름다운 곳이었지만, 21세기 들어 대규모 개발이 시작되면서 국제적인 비즈니스와 주거지가 결합된 스마트시티로 변모했습니다. 현재 송도는 '송도 국제도시'라는 이름으로 불리며, 첨단 기술을 기반으로 한 도시 인프라와 외국인들이 많이 거주하는 다문화적인 분위기가 특징입니다.)
                    </div>

                    <div className="story-para">
                        송도동네 이야기 (송도는 원래 해안선이 넓고 자연경관이 아름다운 곳이었지만, 21세기 들어 대규모 개발이 시작되면서 국제적인 비즈니스와 주거지가 결합된 스마트시티로 변모했습니다.)
                    </div>

                    <div className="story-para">
                        송도동네 이야기 (송도는 원래 해안선이 넓고 자연경관이 아름다운 곳이었지만, 21세기 들어 대규모 개발이 시작되면서 국제적인 비즈니스와 주거지가 결합된 스마트시티로 변모했습니다. 현재 송도는 '송도 국제도시'라는 이름으로 불리며, 첨단 기술을 기반으로 한 도시 인프라와 외국인들이 많이 거주하는 다문화적인 분위기가 특징입니다.)
                    </div>

                    <img className="story-pic-1" src={storyPic1} alt="송도동네 이미지" />

                    <div className="story-para">
                        송도동네 이야기 (송도는 원래 해안선이 넓고 자연경관이 아름다운 곳이었지만, 21세기 들어 대규모 개발이 시작되면서 국제적인 비즈니스와 주거지가 결합된 스마트시티로 변모했습니다. 현재 송도는 '송도 국제도시'라는 이름으로 불리며, 첨단 기술을 기반으로 한 도시 인프라와 외국인들이 많이 거주하는 다문화적인 분위기가 특징입니다.)
                    </div>

                    <img className="story-pic-1" src={storyPic1} alt="송도동네 이미지" />

                    <div className="story-para">
                        송도동네 이야기 (송도는 원래 해안선이 넓고 자연경관이 아름다운 곳이었지만, 21세기 들어 대규모 개발이 시작되면서 국제적인 비즈니스와 주거지가 결합된 스마트시티로 변모했습니다.)
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NaviBarPage1;