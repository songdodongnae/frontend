import React, { useState, useEffect } from "react";
import Header from "../component/Header.js";
import Navigation from "../component/Navigation.js";
import Footer from "../component/Footer.js";
import "../css/FestivalGroupPage.css"
import bookmark from "../images/festivalBookmark.svg";

const FestivalListPage = () => {

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
            
            <Footer />
        </div>
    )
}

export default FestivalListPage;