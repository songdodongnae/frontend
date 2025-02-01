import '../css/SocialLoginBtn.css'
import React from 'react';
import urls from '../config/loginUrls.json';
import { useLocation } from 'react-router-dom';

import googleLogo from '../images/google-logo.svg'
import naverLogo from '../images/naver-logo.svg'
import kakaoLogo from '../images/kakao-logo.svg'

const SocialLoginBtn = () => {
  const location = useLocation();
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className='login-container'>
      <div className='main-display'>
        <div className='welcome-text'>
          <div>송도동네에<br/>오신 것을 환영해요!</div>
        </div>
        <div className='login-buttons'>
          <span className='google-button' onClick={() => handleClick(urls['google-login'])}><img src={googleLogo} width="20px" height="20px"/>구글 로그인</span>
          <span className='naver-button' onClick={() => handleClick(urls['naver-login'])}><img src={naverLogo} width="16px" height="16px"/>네이버 로그인</span>
          <span className='kakao-button' onClick={() => handleClick(urls['kakao-login'])}><img src={kakaoLogo} width="18px" height="18px"/>카카오 로그인</span>
        </div>
      </div>
      <div className='without-login'>
        <span className='without-text'>로그인 없이 이용하기</span>{/* 클릭시 기능 추가 필요 */}
      </div>
    </div>

  );
};

export default SocialLoginBtn;

