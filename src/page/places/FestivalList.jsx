import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "../Series/PlaceCard";
import Header from "../../component/Header";
import MonthSlider from "../places/MonthSlider";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { useGet } from "../../hooks/httpShortcuts";

export default function FestivalList() {

  const location = useLocation();

  const activeTab = location.state?.from==='festivals' ? 'festivals' : 'delicious-spots';
  
  const { data, loading, error, execute: refetch } = useGet(`/api/${activeTab}`, { currentPage: 1, pageSize: 100 }, true, []);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().getMonth() + 1;
    return { id: currentMonth, name: `${currentMonth}월` };
  });

  const getTitle = () => {
    if (selectedMonth) {
      return `${selectedMonth.id}월의 송도동네 축제 일정입니다`;
    }
    return '월을 선택해주세요';
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = data?.data?.content ?? [];

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
          <div className="font-['Noto_Sans_KR'] text-xl font-semibold mb-6">송도 맛집 테마북</div>
          <div className="text-gray-500">로딩 중...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content || content.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
          <div className="font-['Noto_Sans_KR'] text-xl font-semibold mb-6">송도 맛집 테마북</div>
          <div className="text-gray-400">데이터를 불러올 수 없습니다.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />     

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        {location.state?.from === 'festivals' && (
          <MonthSlider onMonthSelect={handleMonthSelect} />
        )}

        <div className="font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] text-[#333] mt-6 mb-8">
          {getTitle()}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
          {content.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}