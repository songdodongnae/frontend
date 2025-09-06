import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <Link to={`/places/${place.id}`} className="card">    
     

      <div key={place.id} className="theme-book-item">
        <div className="theme-book-img-container">
        {place.image ? (
            <img 
              className="theme-book-thumbnail" 
              src={place.image} 
              alt={place.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
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
              이미지 없음
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