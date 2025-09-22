import React, { useContext, useState } from "react";
import HeaderLogo from "../images/HeaderLogo.svg"
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
        <div className="fixed top-0 left-0 z-[1000] flex w-full flex-col items-center bg-white pt-[47px] pb-[22px]">
            <div className="flex w-[970px] justify-center items-end gap-[106px]">
                <div className="flex w-[111px] flex-col items-start cursor-pointer" onClick={goToMain}>
                    <div className="text-right text-[#2E2E2E] font-['Noto_Sans_KR'] text-[8px] font-bold leading-[140%]">
                        송도동네
                    </div>
                    <img className="pt-[5px] pb-[2px]" src={HeaderLogo} alt="logo" />
                    <div className="text-left text-black font-['Noto_Sans_KR'] text-[8.5px] font-semibold leading-[140%]">
                        감도 높은 송도동 F&amp;B 큐레이션
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <div className="flex w-[525px] h-[36px] items-start rounded-[10px] border border-[#C6C6C6] bg-white">
                        <div className="flex flex-wrap items-start flex-[1_0_auto] h-full">
                            <input
                                type="search"
                                placeholder="찾고 있는 축제나 맛집을 검색해보세요"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full h-full border-0 outline-none ml-[20px] text-[#1C1814] font-['Noto_Sans_KR'] text-[12px] leading-[140%] placeholder:text-[#C6C6C6]"
                            />
                        </div>
                        <div className="flex flex-wrap cursor-pointer h-full">
                            <img
                                id="search"
                                src={searchIcon}
                                onClick={goToSearch}
                                className="ml-[10px] mr-[20px] cursor-pointer"
                                alt="검색"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        {accessToken ? (
                            <>
                                <div className="flex justify-center items-end gap-[3px] ml-[81px] text-[#666] font-['Noto_Sans_KR'] text-[12px] leading-[140%] cursor-pointer" onClick={goToMyPage}>
                                    <img src={userIcon} width={"20px"} height={"20px"} alt="user-icon" />
                                    마이페이지
                                </div>
                                <div className="flex justify-center items-end ml-[16px] text-[#71B8FA] font-['Noto_Sans_KR'] text-[12px] leading-[140%] cursor-pointer" onClick={handleLogout}>
                                    로그아웃
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-end gap-[3px] ml-[112px] text-[#4D4D4D] font-['Noto_Sans_KR'] text-[12px] leading-[140%] cursor-pointer" onClick={goToLogin}>
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