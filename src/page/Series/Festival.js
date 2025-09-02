import React, { useState, useEffect } from "react";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import FestivalCalendar from "../../component/FestivalCalendar.js";
import "../../css/Festival.css"
import bookmark from "../../images/festivalBookmark.svg";
import axios from "axios";

const Festival = () => {

    const [festivals, setFestivals] = useState([]);

    const fetchFestivals = async () => {
        try {
          const response = await axios.get(
            "/api/festivals?currentPage=1&pageSize=10"
          , {
        
            validateStatus: (s) => s < 500,          // 401/403도 resolve로 받기
            headers: { Authorization: undefined },   // 혹시 모를 인터셉터 영향 차단
          });
      
          console.log("Full response:", response);   // 전체 응답 객체
          console.log("Data only:", response.data.data.content);  // 실제 데이터(JSON)
          setFestivals(response.data.data.content);
        } catch (error) {
          console.error("Error fetching ads:", error);
        }
      };

      useEffect( () => {
        fetchFestivals();
      } , [])

      console.log("f", festivals)
      
    return (
        <div className="festival-list-page">
            <Header />
            <Navigation />
            <FestivalCalendar />
            <div className="festival-group">
                {festivals.map((fes) => (
                    <div key={fes.id} className="festivals-item">
                        <div className="festivals-img-container">
                            <img className="festivals-thumbnail" src={fes.imageUrl} alt={fes.title} />
                            <div className="festival-bookmark">
                                <div className="festival-bookmark-dot" />
                                <img className="festival-bookmark-icon" src={bookmark} />
                            </div>
                        </div>
                        <div className="festivals-info-container">
                            <div className="festivals-item-title">{fes.creatorName}</div>
                            <div className="festivals-item-disc">{fes.creatorName}</div>
                            <div className="festivals-contents-num">현재 예정 축제 개</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Festival;