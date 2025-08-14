import React, { useState, useEffect } from "react";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import FestivalCalendar from "../../component/FestivalCalendar.js";
import "../../css/NaviBarPage4.css"
import bookmark from "../../images/festivalBookmark.svg";

const NaviBarPage4 = () => {

    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=5") // 더미 API
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    return (
        <div className="festival-list-page">
            <Header />
            <Navigation />
            <FestivalCalendar />
            <div className="festival-group">
                {festivals.map((fes) => (
                    <div key={fes.id} className="festivals-item">
                        <div className="festivals-img-container">
                            <img className="festivals-thumbnail" src={fes.download_url} alt={fes.title} />
                            <div className="festival-bookmark">
                                <div className="festival-bookmark-dot" />
                                <img className="festival-bookmark-icon" src={bookmark} />
                            </div>
                        </div>
                        <div className="festivals-info-container">
                            <div className="festivals-item-title">{fes.author}</div>
                            <div className="festivals-item-disc">{fes.author}{fes.author}{fes.author}{fes.author}{fes.author}{fes.author}{fes.author}</div>
                            <div className="festivals-contents-num">현재 예정 축제 {fes.id}개</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default NaviBarPage4;