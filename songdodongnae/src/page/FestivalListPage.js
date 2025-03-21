import React from "react";
import Header from "../component/Header.js";
import Navigation from "../component/Navigation.js";
import Footer from "../component/Footer.js";
import FestivalCalendar from "../component/FestivalCalendar.js";
import "../css/FestivalListPage.css"

const FestivalListPage = () => {

    return (
        <div className="festival-list-page">
            <Header />
            <Navigation />
            <FestivalCalendar />

            <Footer />
        </div>
    )
}

export default FestivalListPage;