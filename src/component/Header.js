import React, { useContext, useState } from "react";
import HeaderLogo from "../images/HeaderLogo.svg"
import '../css/Header.css'
import searchIcon from "../images/search-icon.svg"
import userIcon from "../images/user-icon.svg"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

const Header = () => {
    const { accessToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const goToMain = () => {
        navigate('/');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    const goToSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/search');
        }
    };

    const goToMyPage = () => {
        navigate("/mypage");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            goToSearch();
        }
    };

    return (
        <div className="header">
            <div className="header-contents">
                <div className="main-logo" onClick={goToMain}>
                    <div className="main-logo-text-1">송도동네</div>
                    <img className="main-logo-img" src={HeaderLogo} alt="logo" />
                    <div className="main-logo-text-2">감도 높은 송도동 F&B 큐레이션</div>
                </div>
                <div className="search-sign">
                    <div className="search-box">
                        <div className="input-box">
                            <input
                                type="search"
                                placeholder="찾고 있는 축제나 맛집을 검색해보세요"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className="img-box">
                            <img 
                                id="search" 
                                src={searchIcon} 
                                onClick={goToSearch}
                                style={{ cursor: 'pointer' }}
                                alt="검색"
                            />
                        </div>
                    </div>
                    <div className="sign">
                        {accessToken ? (
                            <>
                                <div className="my-page-btn" onClick={goToMyPage}>
                                    <img src={userIcon} width={"20px"} height={"20px"} alt="user-icon" />
                                    마이페이지
                                </div>
                                <div className="logout-btn" onClick={handleLogout}>
                                    로그아웃
                                </div>
                            </>
                        ) : (
                            <div className="login-btn" onClick={goToLogin}>
                                <img src={userIcon} width={"20px"} height={"20px"} alt="user-icon" />
                                로그인/회원가입
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header