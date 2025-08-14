import '../css/SocialLoginBtn.css';
// import loginUrls from '../config/loginUrls.json';
import { useEffect, useState } from 'react';

import googleLogo from '../images/google-logo.svg';
import naverLogo from '../images/naver-logo.svg';
import kakaoLogo from '../images/kakao-logo.svg';

const SocialLoginBtn = () => {
  const [recentProvider, setRecentProvider] = useState(null);

  useEffect(() => {
    const savedProvider = localStorage.getItem("recentLoginProvider");
    if (savedProvider) {
      setRecentProvider(savedProvider);
    }
  }, []);

  // const loginButtonClick = (url, provider) => {
  //   localStorage.setItem("recentLoginProvider", provider); // 클릭한 provider 저장
  //   window.location.href = loginUrls['login-base'] + loginUrls[url];
  // };

  return (
    <div className='login-container'>
      <div className='main-display'>
        <div className='welcome-text'>
          <div>송도동네에<br />오신 것을 환영해요!</div>
        </div>
        <div className='login-buttons'>
          {/* 구글 로그인 */}
          {/* <div className="social-btn-wrapper">
            {recentProvider === 'google' && <div className="recent-badge">최근 로그인</div>}
            <span className='google-button' onClick={() => loginButtonClick('google-login', 'google')}>
              <img src={googleLogo} width="20px" height="20px" />구글 로그인
            </span>
          </div> */}

          {/* 네이버 로그인 */}
          {/* <div className="social-btn-wrapper">
            {recentProvider === 'naver' && <div className="recent-badge">최근 로그인</div>}
            <span className='naver-button' onClick={() => loginButtonClick('naver-login', 'naver')}>
              <img src={naverLogo} width="16px" height="16px" />네이버 로그인
            </span>
          </div> */}

          {/* 카카오 로그인 */}
          {/* <div className="social-btn-wrapper">
            {recentProvider === 'kakao' && <div className="recent-badge">최근 로그인</div>}
            <span className='kakao-button' onClick={() => loginButtonClick('kakao-login', 'kakao')}>
              <img src={kakaoLogo} width="18px" height="18px" />카카오 로그인
            </span>
          </div> */}
        </div>
      </div>
      <div className='without-login'>
        <span className='without-text'>로그인 없이 이용하기</span>
      </div>
    </div>
  );
};

export default SocialLoginBtn;
