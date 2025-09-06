import { Link } from "react-router-dom";


const sampleData = [
  {
    id: 1,
    name: "송도 센트럴파크",
    description: "송도의 대표적인 공원으로, 넓은 잔디밭과 호수가 있는 아름다운 공원입니다.",
    image: "https://picsum.photos/300/200?random=1",
    category: "공원",
    rating: 4.5,
    address: "인천 연수구 송도동"
  },
  {
    id: 2,
    name: "송도 갯벌체험장",
    description: "자연생태를 체험할 수 있는 갯벌체험장으로, 아이들과 함께 방문하기 좋습니다.",
    image: "https://picsum.photos/300/200?random=2",
    category: "체험",
    rating: 4.2,
    address: "인천 연수구 송도동"
  },
  {
    id: 3,
    name: "송도 국제도시",
    description: "미래지향적인 스마트시티로, 첨단 기술이 적용된 현대적인 도시입니다.",
    image: "https://picsum.photos/300/200?random=3",
    category: "도시",
    rating: 4.7,
    address: "인천 연수구 송도동"
  },
  {
    id: 4,
    name: "송도 맛집거리",
    description: "다양한 음식을 즐길 수 있는 맛집들이 모여있는 거리입니다.",
    image: "https://picsum.photos/300/200?random=4",
    category: "음식",
    rating: 4.3,
    address: "인천 연수구 송도동"
  },
  {
    id: 5,
    name: "송도 해변",
    description: "아름다운 해변과 함께 바다를 감상할 수 있는 곳입니다.",
    image: "https://picsum.photos/300/200?random=5",
    category: "자연",
    rating: 4.6,
    address: "인천 연수구 송도동"
  }
];


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