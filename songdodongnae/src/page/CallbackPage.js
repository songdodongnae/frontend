import React, {useEffect} from "react";
import { saveToken } from "../module/tokenStorage.js";

const CallbackPage = () => {
    useEffect(() => {
        console.log("saveToken 전");
        setTimeout(() => {
            saveToken();  // 쿠키를 읽어서 localStorage에 저장
            console.log("saveToken 후");
        }, 1000);
    }, []);

    const token = localStorage.getItem('accessToken');
    console.log("localStorage에서 가져온 토큰:", token);
    return (
        <div>
            <h3>{token}</h3>
        </div>
    );
};

export default CallbackPage 