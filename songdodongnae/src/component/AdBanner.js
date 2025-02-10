import { useEffect, useState } from "react";
import '../css/AdBanner.css';
import adDotIcon from '../images/adDot.svg';

const AdBanner = () => {
    const [ads, setAds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=10")
            .then((response) => response.json())
            .then((data) => setAds(data))
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    const showNextAds = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 < ads.length ? prevIndex + 1 : 0
        );
    };
    // 광고 크기 정의
    const adSizes = [
        { width: 656, height: 727 },  // 첫 번째 광고 크기
        { width: 185, height: 648 },  // 두 번째 광고 크기
        { width: 54, height: 650 },  // 세 번째 광고 크기
    ];

    return (
        <div className="ad-banner">
            <div className="ad-contents">
                <div className="ad-img">
                    {ads
                        .slice(currentIndex, currentIndex + 3)
                        .map((ad, index) => {
                            const size = adSizes[index]; // 크기 설정
                            return (
                                <div key={ad.id} className="ad-item" style={{ width: size.width, height: size.height }}>
                                    <img src={ad.download_url} style={{ width: "100%", height: "100%", objectFit: "none"}} />
                                </div>
                            );
                        })}
                </div>

                <div className="ad-navi-dots">
                    <img src={adDotIcon} />
                    <img src={adDotIcon} />
                    <img src={adDotIcon} />
                    <img src={adDotIcon} />
                    <img src={adDotIcon} />
                </div>
            </div>
            <button onClick={showNextAds}>다음</button>
        </div>
    );
};

export default AdBanner;

