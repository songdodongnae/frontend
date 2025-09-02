import { useState } from 'react';
import './MonthSlider.css';

const months = [
  { id: 1, name: '1월', color: '#FF6B6B' },
  { id: 2, name: '2월', color: '#4ECDC4' },
  { id: 3, name: '3월', color: '#45B7D1' },
  { id: 4, name: '4월', color: '#96CEB4' },
  { id: 5, name: '5월', color: '#FFEAA7' },
  { id: 6, name: '6월', color: '#DDA0DD' },
  { id: 7, name: '7월', color: '#98D8C8' },
  { id: 8, name: '8월', color: '#F7DC6F' },
  { id: 9, name: '9월', color: '#BB8FCE' },
  { id: 10, name: '10월', color: '#85C1E9' },
  { id: 11, name: '11월', color: '#F8C471' },
  { id: 12, name: '12월', color: '#82E0AA' }
];

export default function MonthSlider({ onMonthSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 한 번에 보여줄 카드의 개수 (화면 너비에 맞춰 조정)
  const visibleCards = 5;

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    // 부모 컴포넌트에 선택된 월 전달
    if (onMonthSelect) {
      onMonthSelect(month);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(months.length - visibleCards, prev + 1));
  };

  const getVisibleMonths = () => {
    return months.slice(currentIndex, currentIndex + visibleCards);
  };

  return (
    <div className="month-slider-container">
   
      <div className="month-slider">
        <button 
          className="nav-button prev-button" 
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        
        <div className="month-slider-track">
          {getVisibleMonths().map((month) => (
            <div
              key={month.id}
              className={`month-card ${selectedMonth?.id === month.id ? 'selected' : ''}`}
              style={{ backgroundColor: month.color }}
              onClick={() => handleMonthClick(month)}
            >
              <div className="month-name">{month.name}</div>
            </div>
          ))}
        </div>
        
        <button 
          className="nav-button next-button" 
          onClick={handleNext}
          disabled={currentIndex >= months.length - visibleCards}
        >
          ›
        </button>
      </div>
      
    </div>
  );
}
