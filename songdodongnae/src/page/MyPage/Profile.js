export default function Profile() {
    return (
        <div>
            <div className="mypage-profile-header">
                <div className="mypage-profile-imgbox">
                    <img src={null} />
                </div>
                <div className="mypage-profile-welcome">
                    {}님 송도동네에 오신 것을 환영합니다!</div>
                <div className="mypage-profile-savedCuration">
                    저장한 큐레이션 : {}개</div>
            </div>
            <div className="mypage-profile-info">
                <div className="mypage-profile-info-title">회원정보</div>
                
            </div>
        </div>
    );
}
