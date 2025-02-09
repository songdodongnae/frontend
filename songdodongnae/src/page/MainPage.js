import React from 'react';
import icon from '../images/logo128.png'
import { useNavigate } from "react-router-dom";
import Header from "../component/Header.js"
import Navigation from "../component/Navigation.js"
import Footer from "../component/Footer.js"
import AdBanner from "../component/AdBanner.js"

const Main = () => {

    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate('/MyPage');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="main-page">
            <Header />
            <Navigation />
            <h3>2025.02.09 Update</h3>
            <AdBanner />

            {/* 컨텐츠1 */}
            <section className="content1">
                <h2>컨텐츠1</h2>
                {/* 첫 번째 컨텐츠 내용 추가 */}
            </section>

            {/* 컨텐츠2 */}
            <section className="content2">
                <h2>컨텐츠2</h2>
                {/* 두 번째 컨텐츠 내용 추가 */}
            </section>

            {/* 컨텐츠3 */}
            <section className="content3">
                <h2>컨텐츠3</h2>
                {/* 세 번째 컨텐츠 내용 추가 */}
            </section>
            <Footer />
        </div>
    );
};

export default Main;
