import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokenFromCookie } from "../module/tokenStorage.js";
import { AuthContext } from "../contexts/AuthContext"; // 추가

const CallbackPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSaveToken = async () => {
            const tokens = await saveTokenFromCookie(); // access, refresh 반환하도록 수정 필요
            if (tokens) {
                const { accessToken, refreshToken } = tokens;
                login(accessToken, refreshToken); // 로그인 상태 업데이트
            }
            navigate("/");
        };

        fetchAndSaveToken();
    }, [login, navigate]);

    return (
        <div>
            <h3>Redirect Page 입니다.</h3>
        </div>
    );
};

export default CallbackPage;
