import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import PlaceCard from "../Series/PlaceCard";
import Header from "../../component/Header";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { useGet } from "../../hooks/httpShortcuts";
    
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

      <div className="w-full mt-[20vh] bg-[#e8e5e5] flex justify-center items-center min-h-[35vh] gap-[25vh]">
        
        
        <div className="m-0 ml-24 pl-0 whitespace-nowrap min-w-fit text-left -translate-x-[10vh] transform ">
          <div className="font-['Noto_Sans_KR'] text-2xl font-semibold leading-[140%] text-[#333] self-start">
            {getTitle()}
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
              src={`/noimage.svg`}
              onError={() => setImgError(true)}
            />
          )}
          
        </div>
      </div>

      <div className="w-3/5 mt-[5vh] mb-[20vh] items-center">       
        <div className="grid grid-cols-3 gap-x-[4vh] gap-y-[4vh]">
          {content.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}