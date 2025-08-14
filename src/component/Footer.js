import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Footer.css'
import FooterLogo from "../images/FooterLogo.svg";
import instaLogo from "../images/insta-logo.svg";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="footer-contents">
                <div className="footer-up">
                    <div className="icon-box">
                        <img src={FooterLogo} style={{width:'144px', height:'144px'}}/>
                    </div>
                    <div className="info-box">
                        <div className="info">
                            <div className="info-title">서비스 소개</div>  
                            <ul className="info-menu">
                                <li>브랜딩</li>
                                <li>브랜드 철학</li>
                                <li>서비스 스토리</li>
                                <li>서비스 지향점</li>
                            </ul>
                        </div>
                        <div className="info">
                            <div className="info-title">공지사항</div>  
                            <ul className="info-menu">
                                <li>개인정보처리방침</li>
                                <li>최근 소식 정보(송도동)</li>
                            </ul>
                        </div>
                        <div className="info">
                            <div className="info-title">고객센터</div>  
                            <ul className="info-menu">
                                <li>전화번호 02 1234 5678</li>
                                <li>운영시간 09:00~18:00</li>
                            </ul>
                        </div>
                        <div className="info">
                            <div className="info-title">도움</div>   
                            <ul className="info-menu">
                                <li>1:1 문의</li>
                                <li>제휴문의</li>
                                <li>사업 신청</li>
                            </ul>
                        </div>
                        <div className="info">
                            <div className="info-title">FAQ</div>
                        </div>
                    </div>
                </div>
                <div className="social-box">
                    <img src={instaLogo} style={{width:'32px', height:'32px'}}/>
                    @sddn.official
                </div>
            </div>

        </div>
    )
};
export default Footer;