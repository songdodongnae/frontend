import { Link, useLocation } from "react-router-dom";
import { useState } from "react";


export default function PlaceCard({ place }) {
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  console.log('location', location);

  return (

    <Link to={`${location.pathname}/${place.id}`} className="card">    
    
    
      <div key={place.id} className="theme-book-item">
        <div className="theme-book-img-container">
        {place.imageUrl && !imgError ? (
            <img 
              className="theme-book-thumbnail" 
              src={place.imageUrl} 
              alt={place.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div 
              className="theme-book-thumbnail"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'skyblue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '14px'
              }}
            >
             <img 
              className="theme-book-thumbnail" 
              src={`/noimage.jpg`} 
              alt={place.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={() => setImgError(true)}
            />
            </div>
          )}
        </div>
        <div className="theme-book-info-container">
            <div className="theme-book-chara">
                {place.creatorName}
            </div>
            <div className="theme-book-item-title">{place.title}</div>
            <div className="theme-book-date">{place.id}</div>
        </div>
        {/* <div className="theme-book-bookmark">
            <img className="theme-book-bookmark-img" src={bookmark} />
        </div> */}
    </div>
    </Link>
  );
}