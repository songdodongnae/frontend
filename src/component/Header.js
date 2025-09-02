import React, { useContext } from "react";
import HeaderLogo from "../images/HeaderLogo.svg"
import '../css/Header.css'
import searchIcon from "../images/search-icon.svg"
import userIcon from "../images/user-icon.svg"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js"; // AuthContext import

const Header = () => {
    const { accessToken, logout } = useContext(AuthContext); // 로그인 상태와 logout 함수 가져오기
<<<<<<< Updated upstream
=======
    console.log("accessToken", accessToken)
>>>>>>> Stashed changes
    const navigate = useNavigate(); 

    const goToMain = () => {
        navigate('/');
    }

    const goToLogin =() => {
        navigate('/login');
    }

    const goToMyPage = () => {
        navigate("/mypage"); // 마이페이지로 이동
    };

    const handleLogout = () => {
        logout(); // 로그아웃 처리
        navigate("/"); // 메인 페이지로 리디렉션
    };

    return (
        <div className="header">
            <div className="header-contents">
                <div className="main-logo" onClick={goToMain}>
                    <div className="main-logo-text-1">송도동네</div>
                    <img className="main-logo-img" src={HeaderLogo} />
                    <div className="main-logo-text-2">감도 높은 송도동 F&B 큐레이션</div>
                </div>
                <div className="search-sign">
                    <div className="search-box">
                        <div className="input-box">
                            <input
                                type="search"
                                placeholder="찾고 있는 축제나 맛집을 검색해보세요"
                            />
                        </div>
                        <div className="img-box">
                            <img id="search" src={searchIcon} onClick={null}/>
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