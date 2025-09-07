import '../css/SocialLoginBtn.css';
// import loginUrls from '../config/loginUrls.json';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiClient";
import { AuthContext } from "../contexts/AuthContext";
import googleLogo from '../images/google-logo.svg';
import naverLogo from '../images/naver-logo.svg';
import kakaoLogo from '../images/kakao-logo.svg';
import axios from "axios";



const SocialLoginBtn = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [recentProvider, setRecentProvider] = useState(null);
  const handleLoginClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/access-token/0", {
        // 프록시 사용 전제(CRA setupProxy.js). 절대 URL 쓰지 마세요.
        responseType: "text",                    // ← 순수 문자열 JWT
        transformResponse: [(d) => d],           // 자동 JSON 파싱 방지
        validateStatus: (s) => s < 500,          // 401/403도 resolve로 받기
        headers: { Authorization: undefined },   // 혹시 모를 인터셉터 영향 차단
      });
  
      const token = (res.data ?? "").trim();
      console.log("token", token)
      // 간단 JWT 형태 검증(헤더.페이로드.시그니처 3부분)
      if (token.split(".").length === 3) {
        login(token);
        navigate("/");}
    } catch (e) {
      console.error("로그인 실패:", e);
      alert("로그인 실패: 토큰을 받을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };


  const loginButtonClick = (url, provider) => {
    localStorage.setItem("recentLoginProvider", provider); // 클릭한 provider 저장
    window.location.href = '';
  };

  return (
    <div className='login-container'>
      <div className='main-display'>
        <div className='welcome-text'>
          <div>송도동네에<br />오신 것을 환영해요!</div>
        </div>
        <div className='login-buttons'>
          {/* 구글 로그인 */}

          <div className="social-btn-wrapper">
            {recentProvider === 'google' && <div className="recent-badge">최근 로그인</div>}
            <span className='google-button' onClick={() => loginButtonClick('google-login', 'google')}>
              <img src={googleLogo} width="20px" height="20px" />구글 로그인
            </span>
          </div>

          {/* 네이버 로그인 */}
          <div className="social-btn-wrapper">

            {recentProvider === 'naver' && <div className="recent-badge">최근 로그인</div>}
            <span className='naver-button' onClick={() => loginButtonClick('naver-login', 'naver')}>
              <img src={naverLogo} width="16px" height="16px" />네이버 로그인
            </span>

          </div>

          {/* 카카오 로그인 */}
          <div className="social-btn-wrapper">

            {recentProvider === 'kakao' && <div className="recent-badge">최근 로그인</div>}
            <span className='kakao-button' onClick={() => loginButtonClick('kakao-login', 'kakao')}>
              <img src={kakaoLogo} width="18px" height="18px" />카카오 로그인
            </span>
          </div>

        <span className='without-text' onClick={()=> handleLoginClick()}>로그인 없이 이용하기</span>
    </div>
    </div>
    </div>
  );
};

export default SocialLoginBtn;
