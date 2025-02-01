import React from "react";
import HeaderLogo from "../images/HeaderLogo.svg"
import '../css/Header.css'
import searchIcon from "../images/search-icon.svg"
import userIcon from "../images/user-icon.svg"

const Header = () => {
    return (
        <div className="header">
            <div className="header-contents">
                <div className="main-logo" onClick={null}>
                    송도동네
                    <img src={HeaderLogo} />
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
                    <div className="sign" onClick={null}>
                        <img src={userIcon} width={'20px'} height={'20px'}/>
                        로그인/회원가입
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header