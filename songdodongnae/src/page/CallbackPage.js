import React, {useEffect, useState} from "react";
import { saveToken } from "../module/tokenStorage.js";

const CallbackPage = () => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));  // 상태로 토큰 관리
    useEffect(() => {
        console.log("saveToken 전");
        saveToken();  // 쿠키에서 토큰을 가져와 로컬 스토리지에 저장
        setToken(localStorage.getItem('accessToken'));  // 로컬 스토리지에서 토큰을 다시 가져와 상태를 업데이트
        console.log("saveToken 후");
    }, []);

    console.log("localStorage에서 가져온 토큰:", token);
    return (
        <div>
            <h3>Redirect Page 입니다.</h3>
            <h3>토큰 : {token}</h3>
        </div>
    );
};

export default CallbackPage 