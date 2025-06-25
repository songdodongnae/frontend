import React, { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';


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
        </div>
    )
};


