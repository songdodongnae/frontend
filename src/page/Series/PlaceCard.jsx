import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import bookmark from "../../images/festivalBookmark.svg";

export default function PlaceCard({ place, topLabel }) {
  const location = useLocation();
  const [imgError, setImgError] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
	const [hoveredId, setHoveredId] = useState(null);

	const handleBookmarkClick = (e, id) => {
		e.stopPropagation();
		setBookmarkedIds(prev => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

  return (
    <Link to={`${location.pathname}/${place.id}`} className="block">
      <div className="rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">

      
        <div className="relative w-full h-32 md:h-40 lg:h-44 ">

        <div 
        className="flex w-10 h-10 justify-center items-center absolute right-3 bottom-3 z-50 cursor-pointer transition-all duration-200 hover:scale-110"
        onClick={(e) => handleBookmarkClick(e, place.id)}
        onMouseEnter={() => setHoveredId(place.id)}
        onMouseLeave={() => setHoveredId(null)}
        >
          {(() => {
            const isActive = bookmarkedIds.has(place.id) || hoveredId === place.id;
            return (
              <>
                <div className={`w-full h-full flex rounded-full relative transition-all duration-200 ${isActive ? 'bg-gray-800 shadow-lg' : 'bg-white'}`} />
                <img 
                  className={`absolute top-[1px] transition-all duration-200 ${isActive ? 'opacity-100 scale-110' : 'opacity-80'}`} 
                  src={bookmark} 
                  alt="bookmark" 
                />
              </>
            );
          })()}
          </div>
          {place.imageUrl && !imgError ? (
            <img
              className="w-full h-full object-cover"
              src={place.imageUrl}
              alt={place.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <img
            className="w-full h-full rounded-xl object-cover"
            src={`/noimage.png`}
            alt={place.name}
            onError={() => setImgError(true)}
          />
          )}

           
        </div>

        <div className="relative w-full bg-white">
          {topLabel && (
                <div className="ml-10 mt-2 mb-1 text-gray-600 text-[#6B7280] text-sm font-semibold"> {topLabel} </div>
            )}
            
          <div className="ml-12 mt-2 text-gray-600 font-['Noto_Sans_KR'] text-sm leading-[140%]">
            {place.creatorName}
          </div>
          <div className="ml-12 mb-2 text-[#2E2E2E] font-['Noto_Sans_KR'] text-base font-semibold leading-[140%]">
            {place.title}
          </div>
          <div className="ml-12 mb-5 text-gray-300 font-['Noto_Sans_KR'] text-xs leading-[140%]">
            {place.createdAt}
          </div>
        </div>
      </div>
    </Link>
  );
}