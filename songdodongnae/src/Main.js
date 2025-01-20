import React from 'react';
import icon from './images/logo128.png'

const Main = () => {
    return (
        <div className="main-page">
            {/* 헤드 */}
            <header className="header">
                <a href='/'>
                    <img className='icon' src={icon}/>
                </a>
            </header>

            {/* 네비게이션 */}
            <nav className="navigation">
                <ul>
                    <li><a href="/">축제 일정</a></li>
                    <li><a href="/about">코스 추천</a></li>
                    <li><a href="/services">송도 맛집 리스트</a></li>
                </ul>
            </nav>

            {/* 광고 */}
            <section className="advertisement">
                <h2>광고 배너</h2>
                {/* 광고 내용 추가 */}
            </section>

            {/* 컨텐츠1 */}
            <section className="content1">
                <h2>컨텐츠1</h2>
                {/* 첫 번째 컨텐츠 내용 추가 */}
            </section>

            {/* 컨텐츠2 */}
            <section className="content2">
                <h2>컨텐츠2</h2>
                {/* 두 번째 컨텐츠 내용 추가 */}
            </section>

            {/* 컨텐츠3 */}
            <section className="content3">
                <h2>컨텐츠3</h2>
                {/* 세 번째 컨텐츠 내용 추가 */}
            </section>
        </div>
    );
};

export default Main;
