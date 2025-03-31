 import React from "react";
import Header from "../component/Header";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";

import { useNavigate } from "react-router-dom";

const CreatorPage = () => {

    return (
        <div>
            <Header />
            <Navigation /> 
            <div className="creator-title-text">
                <div className="creator-title-text-1">크리에이터</div>
                <div className="creator-title-text-2">관심있는 크리에이터의 글을 읽어보세요.</div>
            </div>
            <div className="creator-mascotte">
                <div className="creator-mascotte-title">
                    <div className="creator-mascotte-title-text">송도동네 친구들</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreatorPage;