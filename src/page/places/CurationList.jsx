import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "../Series/PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { useGet } from "../../hooks/httpShortcuts";
import { FestivalCard } from "../places/Festival";
    
export default function CurationList() {
  const {data} = useGet('/api/curations', { currentPage: 1, pageSize: 100 }, true, []);
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  const getTitle = () => {
    if (location.state?.from === 'trip') {
      return '송도동네 나들이';
    }
    else if (location.state?.from === 'infoSongdo') {
      return '모든 큐레이션';
    }
    else if (location.state?.from ===  'edition') {
      return 'TOP 10 큐레이션';
    } 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = data?.data?.content ?? [];

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Header />
      <Navigation />

      <div className="w-full mt-[20vh] bg-blue-100 flex justify-center items-center min-h-[35vh] gap-[25vh]">
        
        
        <div className="m-0 ml-24 pl-0 whitespace-nowrap min-w-fit text-left -translate-x-[10vh] transform ">
          <div className="font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] text-[#333] self-start">
            {getTitle()}
          </div>
          <div className="pt-4 font-['Noto_Sans_KR'] text-md leading-[140%] text-[#333] self-start">
            지금 송도에서 가장 주목받는 콘첸츠들을 정리해봤어요
          </div>
        </div>
        <div className="flex ml-24 justify-center">

          {content.length > 0 && !imgError ? (
              <img
                className="w-[40vh] h-[25vh] object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                src={content[0]?.imageUrl}
                onError={() => setImgError(true)}
              />
            ) : (
              <img
              className="w-[40vh] h-[25vh] object-cover rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              src={`/noimage.png`}
              onError={() => setImgError(true)}
            />
          )}
          
        </div>
      </div>


      {location.state?.from === 'edition' && content[0] && (
        <div className="w-2/3 flex justify-center mt-[5vh]">
          <FestivalCard activeTab={content[0]} topLabel="TOP 1"/>
        </div>
      )}

      <div className="w-2/3 mt-[5vh] mb-[20vh] items-center">
        <div className="grid grid-cols-3 gap-x-[2vh] gap-y-[4vh]">
        {(location.state?.from === 'edition' ? content.slice(1) : content).map((place, idx) => (
          <PlaceCard
            key={place.id}
            place={place}
            topLabel={location.state?.from === 'edition' ? `TOP ${idx + 2}` : undefined}
          />
        ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}