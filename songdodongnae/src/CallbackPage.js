import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('accessToken');
        console.log("Access Token:", accessToken);

        if (accessToken) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            console.log("Access Token:", accessToken);
            navigate('/');
        }
        
    }, [location.search, navigate]);

    return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
