import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function PlaceCard({ place }) {
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`${location.pathname}/${place.id}`} className="block">
      <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-full h-48 md:h-56 lg:h-60">
          {place.imageUrl && !imgError ? (
            <img
              className="w-full h-full object-cover"
              src={place.imageUrl}
              alt={place.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <img
            className="w-full h-full object-cover"
            src={`/noimage.svg`}
            alt={place.name}
            onError={() => setImgError(true)}
          />
          )}
        </div>

        <div className="relative w-full bg-white border-t border-gray-200">
          <div className="ml-20 mt-7 text-gray-600 font-['Noto_Sans_KR'] text-sm leading-[140%]">
            {place.creatorName}
          </div>
          <div className="ml-20 mb-16 text-[#2E2E2E] font-['Noto_Sans_KR'] text-base font-semibold leading-[140%]">
            {place.title}
          </div>
          <div className="ml-20 mb-7 text-gray-300 font-['Noto_Sans_KR'] text-xs leading-[140%]">
            {place.id}
          </div>
        </div>
      </div>
    </Link>
  );
}