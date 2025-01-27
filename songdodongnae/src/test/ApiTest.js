import React from 'react';
import useGet from '../hooks/useGet.js'; // 커스텀 훅 가져오기
import usePost from '../hooks/usePost.js'; // 커스텀 훅 가져오기
import urls from '../config/apiUrls.json'

function App() {
    const { posts, loading, error } = useGet(urls['base-url'], "post"); // 훅을 사용하여 게시글, 로딩, 에러 상태 받기

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
    }

    if (error) {
        return <div>Error: {error.message}</div>; // 에러가 있을 때 표시할 UI
    }

    return (
        <div>
            <h1>Posts</h1>

            <ul>
                {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </li>
                ))}
            </ul>

            
        </div>
    );
}

export default App;