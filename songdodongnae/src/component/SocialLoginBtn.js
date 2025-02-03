import '../css/SocialLoginBtn.css'
import React, { useState } from 'react';
import urls from '../config/loginUrls.json';
import s_urls from '../config/apiUrls.json';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import googleLogo from '../images/google-logo.svg';
import naverLogo from '../images/naver-logo.svg';
import kakaoLogo from '../images/kakao-logo.svg';

import useGet from '../hooks/useGet.js';

const SocialLoginBtn = () => {
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(s_urls['front-server']+'oauth2', {
        withCredentials: true,  // 쿠키 포함 (필요 시)
      });

      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='main-display'>
        <div className='welcome-text'>
          <div>송도동네에<br/>오신 것을 환영해요!</div>
        </div>
        <div className='login-buttons'>
          <span className='google-button' onClick={handleButtonClick}><img src={googleLogo} width="20px" height="20px"/>구글 로그인</span>
          <span className='naver-button' onClick={handleButtonClick}><img src={naverLogo} width="16px" height="16px"/>네이버 로그인</span>
          <span className='kakao-button' onClick={handleButtonClick}><img src={kakaoLogo} width="18px" height="18px"/>카카오 로그인</span>
        </div>
      </div>
      <div className='without-login'>
        <span className='without-text'>로그인 없이 이용하기</span>{/* 클릭시 기능 추가 필요 */}
      </div>
    </div>

  );
};

export default SocialLoginBtn;

