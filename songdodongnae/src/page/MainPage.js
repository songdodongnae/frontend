import React from 'react';
import icon from '../images/logo128.png'
import { useNavigate } from "react-router-dom";
import Header from "../component/Header.js"
import Navigation from "../component/Navigation.js"
import Footer from "../component/Footer.js"
import Series from '../component/Series.js';
import Curation from '../component/Curation.js';
import Creator from '../component/Creator.js';
import '../css/Main.css'

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
            {/*2025.02.10 Update*/}
            <Header />
            <Navigation />
            <div className='body'>
                <Series />
                <Curation />
                <Creator />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
