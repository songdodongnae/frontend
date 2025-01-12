// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import useGet from './hooks/useGet'; // 커스텀 훅 가져오기
import usePost from './hooks/usePost'; // 커스텀 훅 가져오기

const postSlice = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true); // 데이터 로딩 시작
                const data = await postData('/todos');
                setPosts(data);
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

export default postSlice;