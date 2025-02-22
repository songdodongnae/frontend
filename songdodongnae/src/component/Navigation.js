import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Navigation.css'

const Navigation = () => {
    const navigate = useNavigate();
    
    const goFromNavi = (path) => {
        navigate(path);
    }

    return (
        <div className="navigation">
            <ul className="navi-ul">
                <li className="navi-li" onClick={() => goFromNavi('/story')}>송도동네 이야기</li> 
                <li className="navi-li" onClick={() => goFromNavi('/infoSongdo')}>송도의 모든 것</li>
                <li className="navi-li" onClick={() => goFromNavi('/edition')}>송도동네 에디션</li>
                <li className="navi-li" onClick={() => goFromNavi('/festivalList')}>송도 축제 모두 보기</li>
            </ul>
        </div>
    )
};
export default Navigation; 