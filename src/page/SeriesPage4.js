import React, { useEffect, useState } from "react";
import Header from "../../component/Header.js";
import Navigation from "../../component/Navigation.js";
import Footer from "../../component/Footer.js";
import bookmark from '../../images/bookmark.svg';
import prev from '../../images/left-arrow-black.svg';
import next from '../../images/right-arrow-black.svg';

import '../../css/SeriesPage4.css';

const SeriesPage4 = () => {
    const [themeBook, setThemeBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [chara] = useState(['송이', '도동이', '동이', '네이']);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=24") // 더미 데이터를 더 많이 불러옴
            .then((response) => response.json())
            .then((data) => setThemeBook(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = themeBook.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(themeBook.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="series-page-4">
            <Header />
            <Navigation />
            <div className="theme-book">
                <div className="theme-book-title">송도 맛집 테마북 </div>
                <div className="theme-book-body">
                    {currentItems.map((tb, index) => (
                        <div key={tb.id} className="theme-book-item">
                            <div className="theme-book-img-container">
                                <img className="theme-book-thumbnail" src={tb.download_url} alt={tb.title} />
                            </div>
                            <div className="theme-book-info-container">
                                <div className="theme-book-chara">
                                    {chara[(indexOfFirstItem + index) % chara.length]}
                                </div>
                                <div className="theme-book-item-title">{tb.author}</div>
                                <div className="theme-book-date">2025.01.{tb.id}</div>
                            </div>
                            <div className="theme-book-bookmark">
                                <img className="theme-book-bookmark-img" src={bookmark} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <div className="prev-button-container">
                        <img className="prev-button" src={prev} />
                    </div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <div
                            onClick={() => handlePageChange(i + 1)}
                            className={`pagination-button-container ${currentPage === i + 1 ? 'active' : ''}`}>
                            <div
                                key={i + 1}
                                className="pagination-button"
                            >
                                {i + 1}
                            </div>
                        </div>
                    ))}
                    <div className="next-button-container">
                        <img className="next-button" src={next} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SeriesPage4;
