import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "../Series/PlaceCard";
import Header from "../../component/Header";
import MonthSlider from "../places/MonthSlider";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { useGet } from "../../hooks/httpShortcuts";
import { FestivalCard } from "./Festival";

export default function FestivalList() {

  // 현재 달로 초기값 설정
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().getMonth() + 1;
    return { id: currentMonth, name: `${currentMonth}월` };
  });


  const { data, loading, error, execute: refetch } = useGet(
    `/api/festivals/day`, 
    { year: 2025, month: selectedMonth.id }, 
    false, 
    []
  );

  useEffect(() => {
    if (selectedMonth) {
      console.log('Calling API with month:', selectedMonth.id);
      refetch({ params: { year: 2025, month: selectedMonth.id } });
    }
  }, [selectedMonth.id, refetch]);


  const getTitle = () => {
    if (selectedMonth) {
      return `${selectedMonth.id}월의 송도동네 축제 일정입니다`;
    }
    return '월을 선택해주세요';
  };

  const handleMonthSelect = useCallback((month) => {
    console.log('handleMonthSelect called with:', month);
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = loading? [] : (data?.data);

  console.log('festival', content)


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />     

      <div className="flex-1 pt-20 w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <MonthSlider onMonthSelect={handleMonthSelect} initialMonth={selectedMonth} />
      

        <div className="pt-4 font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] text-[#333] mt-6 mb-8">
          {getTitle()}
        </div>

        {content && content.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            {content.map((place) => (
              <FestivalCard key={place.id} activeTab={place} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 text-lg font-medium">
              선택하신 달에 해당하는 축제가 없습니다
            </div>
            <div className="text-gray-300 text-sm mt-2">
              다른 달을 선택해보세요
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}