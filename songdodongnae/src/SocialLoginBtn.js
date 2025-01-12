import React from 'react';
import urls from './config/loginUrls.json';

const SocialLoginBtn = () => {
    const handleClick = (url) => {
        window.location.href = url;
    };

    return (
        <div>
            <h2> 소셜 로그인 </h2>
            <span onClick={() => handleClick(urls['naver-login'])}> 네이버 로그인 </span>
            <span onClick={() => handleClick(urls['kakao-login'])}> 카카오 로그인 </span>
            <span onClick={() => handleClick(urls['google-login'])}> 구글 로그인 </span>
        </div>
    );
};

export default SocialLoginBtn;

