import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Navigation from "../../component/Navigation";

export default function MyPageLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // /mypage에 접근했을 때 자동으로 /mypage/admin으로 리다이렉트
    useEffect(() => {
        if (location.pathname === '/mypage') {
            navigate('/mypage/admin', { replace: true });
        }
    }, [location.pathname, navigate]);
    
    // 현재 경로에 따라 활성화된 메뉴 결정
    const getActiveClass = (path) => {
        const currentPath = location.pathname;
        if (path === 'admin' && (currentPath.endsWith('/admin') || currentPath.endsWith('/mypage'))) {
            return "block w-full px-4 py-3 text-left text-white bg-blue-600 rounded-lg transition-colors duration-200";
        }
        if (currentPath.endsWith(`/${path}`)) {
            return "block w-full px-4 py-3 text-left text-white bg-blue-600 rounded-lg transition-colors duration-200";
        }
        return "block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200";
    };

    return (
        <div className="min-h-screen bg-gray-50"> 
            <Header />
            <Navigation />
            
            <div className="pl-[30vh] pt-60 px-4 container mx-auto py-8">
                <div className="flex gap-6 lg:gap-12">
                    {/* 사이드바 - 고정 너비로 설정 */}
                    <aside className="w-60 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
                                마이페이지
                            </h2>
                            
                            <nav className="space-y-3">
                                <Link 
                                    to="admin" 
                                    className={getActiveClass('admin')}
                                >
                                    어드민
                                </Link>
                                <Link 
                                    to="profile" 
                                    className={getActiveClass('profile')}
                                >
                                    회원정보 수정
                                </Link>
                                
                                
                                
                                <Link 
                                    to="inquiry" 
                                    className={getActiveClass('inquiry')}
                                >
                                    1:1 문의
                                </Link>
                                
                                <Link 
                                    to="withdraw" 
                                    className={getActiveClass('withdraw')}
                                >
                                    회원탈퇴
                                </Link>
                            </nav>
                        </div>
                    </aside>
                    
                    {/* 메인 콘텐츠 - 유연한 너비로 설정 */}
                    <main className="flex-1 min-w-0 max-w-screen-md">
                        <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px] w-full">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
            
            <Footer />
        </div>
    )
};


