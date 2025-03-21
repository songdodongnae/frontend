import React, { useState } from "react";
import '../css/FestivalCalendar.css';
import dayjs from 'dayjs';

const FestivalCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const startOfMonth = currentMonth.startOf('month');
    const daysInMonth = currentMonth.daysInMonth();
    const prevDaysCount = startOfMonth.day(); // 이전 달의 빈 칸 개수
    const totalCells = prevDaysCount + daysInMonth; // 총 셀 개수 (빈 칸 포함)

    // 일정 데이터 예시
    const festivalEvents = [
        /**{ date: 2, title: "2025 고교연합 입시 발표" },
        { date: 9, title: "음악 이벤트" },
        { date: 16, title: "스포츠 경기" },
        { date: 23, title: "기타 일정" }, */
    ];

    const getEventForDay = (day) => {
        return festivalEvents.filter(event => event.date === day);
    };

    const renderDays = () => {
        const days = [];

        // 이전 달 빈 칸 추가 (테두리 유지, 숫자 없음)
        for (let i = 0; i < prevDaysCount; i++) {
            days.push(<div key={`empty-prev-${i}`} className="day empty"></div>);
        }

        // 이번 달 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDay(day);
            days.push(
                <div key={day} className="day current-month">
                    <span>{day}</span>
                    {event.map((e, index) => (
                        <div key={index} className="festival-event">{e.title}</div>
                    ))}
                </div>
            );
        }

        // 다음 달 빈 칸 추가 (숫자 없음, 정렬 유지)
        while (days.length % 7 !== 0) {
            days.push(<div key={`empty-next-${days.length}`} className="day empty"></div>);
        }

        return days;
    };

    return (
        <div className="festival-calendar">
            <div className="festival-category">
                <div className="festival-category-header">
                    <div className="festival-category-header-text">카테고리</div>
                </div>
                <div className="festival-category-body">
                    <div className="festival-category-compo">음악</div>
                    <div className="festival-category-compo">스포츠</div>
                    <div className="festival-category-compo">음식</div>
                    <div className="festival-category-compo">기타</div>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-header">
                    <div>{currentMonth.format('M월')}</div>
                </div>
                <div className="days-of-week">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="day-of-week">{day}</div>
                    ))}
                </div>
                <div className="days">{renderDays()}</div>
            </div>
        </div>
    );
};

export default FestivalCalendar;
