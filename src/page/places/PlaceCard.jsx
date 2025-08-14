import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <Link to={`/places/${place.id}`} className="card">
     
     

      <div key={place.id} className="theme-book-item">
        <div className="theme-book-img-container">
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
        </div>
        <div className="theme-book-info-container">
            <div className="theme-book-chara">
                {place.category}
            </div>
            <div className="theme-book-item-title">{place.name}</div>
            <div className="theme-book-date">2025.01.{place.id}</div>
        </div>
        {/* <div className="theme-book-bookmark">
            <img className="theme-book-bookmark-img" src={bookmark} />
        </div> */}
    </div>
    </Link>
  );
}