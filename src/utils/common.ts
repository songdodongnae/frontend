export interface Curation {
    id: number;
    isBookmarked?: boolean;
    title: string;
    imageUrl: string;               // 카드 썸네
    creatorName: string;           // 작성자 배지(옵션)
  }

export interface FestivalDetail {
  title: string;
  creatorName: string;
  startDate: string;
  endDate: string;
  timeDescription: string;
  latitude: number;
  longitude: number;
  address: string;
  fee: string;
  contact: string;
  homePageUrl: string;
  reservationUrl: string;
  description: string;
  onelineDescription: string;
  mainImage: string;
  images?: string[];
}

