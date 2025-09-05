import axios from "axios";

// Axios 인스턴스 생성
export const apiClient = axios.create({
    // 백엔드 API 기본 URL
    timeout: 5000, // 요청 제한 시간 (ms)
});

// 요청 인터셉터: 요청마다 토큰 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // localStorage에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 요청 에러 처리
    }
);

// 데이터 요청 함수
export const fetchData = async () => {
    try {
        const response = await apiClient.get("/data"); // GET 요청
        console.log(response.data); // 응답 데이터 출력
        return response.data;
    } catch (error) {
        console.error("API 요청 에러:", error);
        throw error;
    }
};
