import React, { createContext, useState, useEffect } from 'react';

// Context 생성
export const AuthContext = createContext();

// AuthContext Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

    useEffect(() => {
        // 토큰이 변경될 때마다 localStorage에 저장
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    }, [accessToken, refreshToken]);

    const login = (access, refresh) => {
        setAccessToken(access);
        setRefreshToken(refresh);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
