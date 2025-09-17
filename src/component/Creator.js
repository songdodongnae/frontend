import React from "react";
import { useNavigate } from "react-router-dom";
import charaSong from '../images/song.svg';
import charaDodong from '../images/dodong.svg';
import charaDong from '../images/dong.svg';
import charaNe from '../images/ne.svg';


const Creator = () => {
    const navigate = useNavigate();

    const goToCreator = (creatorName = null) => {
        console.log('Navigating to:', creatorName); // 디버깅용
        if (creatorName) {
            navigate(`/creator?creator=${creatorName}`);
        } else {
            navigate('/creator');
        }
    }

    return (
        <div className="flex w-32 px-3 py-7 flex-col items-center gap-4 sticky top-60 rounded-full bg-gray-200 mt-60">
            {/* 헤더 */}
            <div className="self-stretch">
                <div className="text-black text-center font-medium text-base leading-tight tracking-tight">
                    크리에이터
                </div>
            </div>
            
            {/* 캐릭터 목록 */}
            <div className="flex flex-col items-start gap-3">
                {/* 송이 */}
                <div 
                    className="flex justify-center w-25 h-25 p-1.5 flex-col items-center gap-1 rounded-full bg-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 active:scale-95"
                    onClick={() => goToCreator('song')}
                >
                    <img 
                        className="w-10 h-12 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-110 pointer-events-none" 
                        src={charaSong} 
                        alt="송이"
                    />
                    <div className="w-4/5 h-10 flex-shrink-0 text-black text-center font-normal text-xs leading-tight tracking-tight break-keep">
                        매운 음식 좋아하는 <strong>'송이'</strong>
                    </div>
                </div>
                
                {/* 도이 */}
                <div 
                    className="flex justify-center w-25 h-25 p-1.5 flex-col items-center gap-1 rounded-full bg-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 active:scale-95"
                    onClick={() => goToCreator('do')}
                >
                    <img 
                        className="w-10 h-10 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-110 pointer-events-none" 
                        src={charaDodong} 
                        alt="도이"
                    />
                    <div className="w-4/5 h-10 flex-shrink-0 text-black text-center font-normal text-xs leading-tight tracking-tight break-keep">
                        혼자 놀기 만렙 <strong>'도이'</strong>
                    </div>
                </div>
                
                {/* 동이 */}
                <div 
                    className="flex justify-center w-25 h-25 p-1.5 flex-col items-center gap-1 rounded-full bg-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 active:scale-95"
                    onClick={() => goToCreator('dong')}
                >
                    <img 
                        className="w-10 h-10 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-110 pointer-events-none" 
                        src={charaDong} 
                        alt="동이"
                    />
                    <div className="w-4/5 h-10 flex-shrink-0 text-black text-center font-normal text-xs leading-tight tracking-tight break-keep">
                        빵과 커피를 사랑하는 <strong>'동이'</strong>
                    </div>
                </div>
                
                {/* 네이 */}
                <div 
                    className="flex justify-center w-25 h-25 p-1.5 flex-col items-center gap-1 rounded-full bg-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 active:scale-95"
                    onClick={() => goToCreator('ne')}
                >
                    <img 
                        className="w-10 h-12 flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-110 pointer-events-none" 
                        src={charaNe} 
                        alt="네이"
                    />
                    <div className="w-4/5 h-10 flex-shrink-0 text-black text-center font-normal text-xs leading-tight tracking-tight break-keep">
                        운동 마니아     <strong>'네이'</strong>
                    </div>
                </div>
            </div>
            
            {/* 전체보기 버튼 */}
            <div className="flex justify-center items-center w-full">
                <div 
                    className="text-gray-600 text-center font-normal text-xs leading-tight tracking-tight px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md" 
                    onClick={() => goToCreator()}
                >
                    전체보기
                </div>
            </div>
        </div>
    )
}

export default Creator;