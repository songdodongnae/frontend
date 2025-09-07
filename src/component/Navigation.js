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
                <li className="navi-li navi-li-1" onClick={() => goFromNavi('/story')}>송도동네 이야기</li> 
                <li className="navi-li navi-li-2" onClick={() => navigate('/curation', { state: { from: 'infoSongdo' } })}>모든 큐레이션</li>
                <li className="navi-li navi-li-3" onClick={() => navigate('/curation', { state: { from: 'edition' } })}>TOP 10 큐레이션</li>
                <li className="navi-li navi-li-4" onClick={() => navigate('/places', { state: { from: 'festivals' } })}>송도 축제 모두 보기</li>

            </ul>
        </div>
    )
};
export default Navigation; 