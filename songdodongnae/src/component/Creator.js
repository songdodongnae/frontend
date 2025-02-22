import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Creator.css";

const Creator = () => {
    const navigate = useNavigate();

    const goToCreator = () => {
        navigate('/creator')
    }

    return (
        <div>
            <div className="creator-header">
                <div className="creator-title">송도동네 시리즈</div>
                <div className="overall" onClick={() => goToCreator()}>전체보기</div>
            </div>
            <div className="creator-body">
                
            </div>
        </div>
    )
}

export default Creator;