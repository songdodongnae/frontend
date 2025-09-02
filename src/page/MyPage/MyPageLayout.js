import React, { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
<<<<<<< Updated upstream


export default function MyPageLayout() {
    return (
        <div className="flex">
            <aside className="w-1/4">
                <div className="mypage-title">마이페이지</div>
                <nav className="flex flex-col space-y-2">
                    <Link to="profile">회원정보 수정</Link>
                    <Link to="saved">저장한 큐레이션</Link>
                    <Link to="creator">크리에이터</Link>
                    <Link to="inquiry">1:1 문의</Link>
                    <Link to="withdraw">회원탈퇴</Link>
                </nav>
            </aside>
            <main className="w-3/4">
                <Outlet />
            </main>
=======
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Navigation from "../../component/Navigation";

export default function MyPageLayout() {
    return (
        <div className="min-h-screen bg-gray-50"> 
            <Header />
            <Navigation />
            
            <div className="pt-60 px-60 container mx-auto px-4 py-8">
                <div className="flex gap-12">
                    {/* 사이드바 */}
                    <aside className="w-60 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
                                마이페이지
                            </h2>
                            
                            <nav className="space-y-3">
                                <Link 
                                    to="admin" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    어드민
                                </Link>
                                <Link 
                                    to="profile" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    회원정보 수정
                                </Link>
                                
                                <Link 
                                    to="saved" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    저장한 큐레이션
                                </Link>
                                
                                <Link 
                                    to="creator" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    크리에이터
                                </Link>
                                
                                <Link 
                                    to="inquiry" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    1:1 문의
                                </Link>
                                
                                <Link 
                                    to="withdraw" 
                                    className="block w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                >
                                    회원탈퇴
                                </Link>
                            </nav>
                        </div>
                    </aside>
                    
                    {/* 메인 콘텐츠 */}
                    <main className="flex-1">
                        <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px]">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
            
            <Footer />
>>>>>>> Stashed changes
        </div>
    )
};


