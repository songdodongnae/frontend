import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Series.css';

const Series = () => {
    const navigate = useNavigate();

    const goToSeries = () => {
        navigate('/series')
    }

    return (
        <div className="series">
            <div className="series-header">
                <div className="series-title">송도동네 시리즈</div>
                <div className="overall" onClick={() => goToSeries()}>전체보기</div>
            </div>
            <div className="series-body">

            </div>
        </div>
    )
}

export default Series;