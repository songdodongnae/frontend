import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져와 로컬 스토리지에 저장하고 쿠키에서 삭제하는 함수
export const saveToken = () => {
    const accessToken = Cookies.get('accessToken');
    
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        Cookies.remove('accessToken'); // 쿠키에서 삭제
    }
};

    // 로그아웃 시 로컬 스토리지에서 토큰을 삭제하는 함수
    export const logout = () => {
    localStorage.removeItem('accessToken');
};

    // 로컬 스토리지에서 토큰을 가져와 Authorization 헤더에 추가하는 함수
    export const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

    // API 요청을 보내는 함수 예시
    export const fetchData = async () => {
    try {
        const response = await axios.get('/some-api-endpoint', {
        headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 오류:', error);
        throw error;
    }
};
