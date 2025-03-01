import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Creator.css";
import charaSong from '../images/song.png';
import charaDodong from '../images/dodong.png';
import charaDongdo from '../images/dongdo.png';
import charaNe from '../images/ne.png';


const Creator = () => {
    const navigate = useNavigate();

    const goToCreator = () => {
        navigate('/creator')
    }

    return (
        <div className="creator">
            <div className="creator-header">
                <div className="creator-title">크리에이터</div>
            </div>
            <div className="creator-body">
                <div className="creator-box">
                    <img className="creator-chara" src={charaSong}/>
                    <div className="creator-disc">매운거 좋아하는 빵순이 <strong>'송이'</strong></div>
                </div>
                <div className="creator-box">
                    <img className="creator-chara" src={charaDodong}/>
                    <div className="creator-disc">단거 싫어하는 활동적인 <strong>'도동이'</strong></div>
                </div>
                <div className="creator-box">
                    <img className="creator-chara" src={charaDongdo}/>
                    <div className="creator-disc">글자수채우기글자수채우기글자수채우기 <strong>'동도'</strong></div>
                </div>
                <div className="creator-box">
                    <img className="cr eator-chara" src={charaNe}/>
                    <div className="creator-disc">사진찍기 좋아하는 <strong>'네이'</strong></div>
                </div>
            </div>
            <div className="creator-bottom">
                <div className="overall" onClick={() => goToCreator()}>전체보기</div>
            </div>
        </div>
    )
}

export default Creator;