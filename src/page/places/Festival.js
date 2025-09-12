import React, { useState, useEffect } from "react";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import FestivalCalendar from "../../component/FestivalCalendar.js";
import bookmark from "../../images/festivalBookmark.svg";
import axios from "axios";

const Festival = () => {

    const [festivals, setFestivals] = useState([]);

    const fetchFestivals = async () => {
        try {
          const response = await axios.get(
            "/api/festivals?currentPage=1&pageSize=10"
          , {
        
            validateStatus: (s) => s < 500,
            headers: { Authorization: undefined },
          });
      
          console.log("Full response:", response);
          console.log("Data only:", response.data.data.content);
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
        <div className="flex flex-col items-center">
            <Header />
            <Navigation />
            <FestivalCalendar />
            <div className="flex flex-col justify-center items-center gap-12 mb-[158px]">
                {festivals.map((fes) => (
                    <div key={fes.id} className="flex w-[960px] items-center">
                        <div className="w-[480px] h-[427px] relative">
                            <img className="w-full h-full rounded-tl-[30px] rounded-bl-[30px] object-cover" src={fes.imageUrl} alt={fes.title} />
                            <div className="flex w-14 h-14 justify-center items-center absolute right-[26px] bottom-[24px] z-50">
                                <div className="w-full h-full flex bg-white rounded-full relative" />
                                <img className="absolute right-[7px] top-[7px]" src={bookmark} alt="bookmark" />
                            </div>
                        </div>
                        <div className="flex w-[480px] h-[427px] flex-col items-start shrink-0 rounded-tr-[30px] rounded-br-[30px] bg-[#EFEFEF]">
                            <div className="flex flex-col justify-center shrink-0 self-stretch pl-[25px] pr-[38px] pt-[25px] pb-[219px] text-[#1C1814] font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%]">
                                {fes.creatorName}
                            </div>
                            <div className="text-[#1C1814] font-['Noto_Sans_KR'] text-lg font-semibold leading-[140%] px-[38px] pl-[25px] pb-4 break-words">
                                {fes.creatorName}
                            </div>
                            <div className="text-[#4D4D4D] font-['Noto_Sans_KR'] text-lg font-medium leading-[140%] px-[38px] pl-[25px] pb-[25px]">
                                현재 예정 축제 개
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Festival;