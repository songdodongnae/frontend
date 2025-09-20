import { useState, useEffect, useMemo, useCallback } from 'react';

const months = [
  { id: 1, name: '1월', color: '#1F2937' },   // 회색-800
  { id: 2, name: '2월', color: '#374151' },   // 회색-700
  { id: 3, name: '3월', color: '#4B5563' },   // 회색-600
  { id: 4, name: '4월', color: '#6B7280' },   // 회색-500
  { id: 5, name: '5월', color: '#9CA3AF' },   // 회색-400
  { id: 6, name: '6월', color: '#D1D5DB' },   // 회색-300
  { id: 7, name: '7월', color: '#E5E7EB' },   // 회색-200
  { id: 8, name: '8월', color: '#F3F4F6' },   // 회색-100
  { id: 9, name: '9월', color: '#F9FAFB' },   // 회색-50
  { id: 10, name: '10월', color: '#E5E7EB' }, // 회색-200
  { id: 11, name: '11월', color: '#D1D5DB' }, // 회색-300
  { id: 12, name: '12월', color: '#9CA3AF' }  // 회색-400
];

export default function MonthSlider({ onMonthSelect, initialMonth }) {
  const visibleCards = 5;
  const centerOffset = Math.floor(visibleCards / 2);

  // 부모로부터 받은 초기값이 있으면 사용, 없으면 현재 달 사용
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (initialMonth) {
      const idx = months.findIndex(m => m.id === initialMonth.id);
      return idx !== -1 ? idx : new Date().getMonth();
    }
    return new Date().getMonth(); // 0 ~ 11
  });

  // 현재 보여줄 달들의 시작 인덱스 계산
  const windowStart = useMemo(() => {
    return Math.max(
      0,
      Math.min(selectedIndex - centerOffset, months.length - visibleCards)
    );
  }, [selectedIndex, centerOffset]);

  // 현재 보여줄 달들
  const visibleMonths = useMemo(
    () => months.slice(windowStart, windowStart + visibleCards),
    [windowStart]
  );

  // 선택된 달 객체
  const selectedMonth = useMemo(() => months[selectedIndex], [selectedIndex]);

  // 선택이 변경될 때마다 부모에게 알림
  useEffect(() => {
    console.log('MonthSlider: 선택된 달 변경:', selectedMonth);
    onMonthSelect?.(selectedMonth);
  }, [selectedIndex, onMonthSelect]);

  const handleMonthClick = useCallback((month) => {
    const monthIndex = months.findIndex(m => m.id === month.id);
    if (monthIndex !== -1) {
      console.log('MonthSlider: 달 클릭됨:', month, 'index:', monthIndex);
      setSelectedIndex(monthIndex);
    }
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => {
      const newIndex = Math.max(0, prev - 1);
      console.log('MonthSlider: 이전 버튼, 새 인덱스:', newIndex);
      return newIndex;
    });
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => {
      const newIndex = Math.min(months.length - 1, prev + 1);
      console.log('MonthSlider: 다음 버튼, 새 인덱스:', newIndex);
      return newIndex;
    });
  }, []);

  // 좌우 버튼 비활성화 조건
  const isPrevDisabled = selectedIndex === 0;
  const isNextDisabled = selectedIndex === months.length - 1;

  return (
    <div className="w-full mt-[20vh] flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 relative">
        {/* 이전 버튼 */}
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/90 text-gray-800 text-xl font-bold cursor-pointer z-10 transition-all duration-200 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed`}
          onClick={handlePrev}
          disabled={isPrevDisabled}
          aria-label="이전 달"
        >
          ‹
        </button>

        {/* 월 버튼 슬라이더 */}
        <div className="flex gap-3 justify-center overflow-hidden">
          {visibleMonths.map((month) => {
            const isSelected = selectedMonth?.id === month.id;
            return (
              <button
                key={month.id}
                className={`flex-shrink-0 w-32 h-32 flex items-center justify-center rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'scale-105 shadow-lg border-2 border-gray-500'
                    : 'hover:shadow-md'
                }`}
                style={{ backgroundColor: month.color }}
                onClick={() => handleMonthClick(month)}
                aria-pressed={isSelected}
                aria-label={`${month.name} 선택`}
              >
                <span className="text-sm text-gray-900 font-medium">
                  {month.name}
                </span>
              </button>
            );
          })}
        </div>

        
        {/* 다음 버튼 */}
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/90 text-gray-800 text-xl font-bold cursor-pointer z-10 transition-all duration-200 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed`}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>
    </div>
  );
}