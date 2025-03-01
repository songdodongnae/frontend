import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Curation.css";

const Curation = () => {
    const navigate = useNavigate();

    const goToCuration = () => {
        navigate('/curation')
    }

    return (
        <div className="curation">
            <div className="curation-header">
                <div className="curation-title">방금 올라온 큐레이션</div>
                <div className="overall" onClick={() => goToCuration()}>전체보기</div>
            </div>
            <div className="curation-body">
                
            </div>
        </div>
    )
}

export default Curation;