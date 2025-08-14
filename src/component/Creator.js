import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Creator.css";
import charaSong from '../images/song.svg';
import charaDodong from '../images/dodong.svg';
import charaDong from '../images/dong.svg';
import charaNe from '../images/ne.svg';


const Creator = () => {
    const navigate = useNavigate();

    const goToCreator = () => {
        navigate('/creator')
    }

    return (
        <div className="creator">
            <div className="creator-header">
                <div className= "creator-title">크리에이터</div>
            </div>
            <div className="creator-body">
                <div className="creator-box">
                    <img className="creator-chara" src={charaSong}/>
                    <div className="creator-disc">매운 음식 좋아하는 <strong>'송이'</strong></div>
                </div>
                <div className="creator-box">
                    <img className="creator-chara" src={charaDodong}/>
                    <div className="creator-disc">혼자 놀기 만렙 <strong>'도동이'</strong></div>
                </div> 
                <div className="creator-box">
                    <img className="creator-chara" src={charaDong}/>
                    <div className="creator-disc">빵과 커피를 사랑하는 <strong>'동이'</strong></div>
                </div>
                <div className="creator-box">
                    <img className="creator-chara" src={charaNe}/>
                    <div className="creator-disc">운동 마니아     <strong>'네이'</strong></div>
                </div>
            </div>
            <div className="creator-bottom">
                <div className="overall" onClick={() => goToCreator()}>전체보기</div>
            </div>
        </div>
    )
}

export default Creator;