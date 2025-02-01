import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Navigation.css'

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <div className="navigation">
            <ul className="navi-ul">
                <li className="navi-li">축제 일정</li> 
                <li className="navi-li">코스 추천</li>
                <li className="navi-li">송도 맛집 리스트</li>
            </ul>
        </div>
    )
};
export default Navigation;