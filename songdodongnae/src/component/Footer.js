import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="footer-contents">
                <div className="icon-box">

                </div>
                <div className="info-box">
                    <div className="info1">
                        <div className="info-title">서비스 소개</div>  
                        <ul>
                            <li>브랜딩</li>
                            <li>브랜드 철학</li>
                            <li>서비스 스토리</li>
                            <li>서비스 지향점</li>
                        </ul>
                    </div>
                    <div className="info2">
                        <div className="info-title">공지사항</div>  
                        <ul>
                            <li>개인정보처리방침</li>
                            <li>최근 소식 정보(송도동)</li>
                        </ul>
                    </div>
                    <div className="info3">
                        <div className="info-title">고객센터</div>  
                        <ul>
                            <li>전화번호 02 1234 5678</li>
                            <li>운영시간 09:00~18:00</li>
                        </ul>
                    </div>
                    <div className="info4">
                        <div className="info-title">도움</div>   
                        <ul>
                            <li>1:1 문의</li>
                            <li>제휴문의</li>
                            <li>사업 신청</li>
                        </ul>
                    </div>
                    <div className="info5">
                        <div className="info-title">FAQ</div>
                    </div>

                </div>
                <div className="social-box">

                </div>
            </div>

        </div>
    )
};
export default Footer;