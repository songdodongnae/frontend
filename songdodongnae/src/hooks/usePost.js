import { useState, useEffect } from 'react';
import { postData } from '../module/apiRequest';
import urls from '../config/apiUrls.json'

const usePost = (url, endpoint, data) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true); // 데이터 로딩 시작
                const dataResponse = await postData(url, urls[endpoint], data);
                setPosts(dataResponse);
            } catch (error) {
                setError(error); // 에러 발생 시 처리
            } finally {
                setLoading(false); // 데이터 로딩 끝
            }
        };

        getPosts();
    }, []);

    return { posts, loading, error };
};

export default usePost;