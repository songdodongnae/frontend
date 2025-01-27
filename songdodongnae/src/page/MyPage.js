import React, { useEffect, useState } from "react";
import { fetchData } from "../module/apiClient.js";

const MyPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchData();
                setData(response);
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h1>API 데이터</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>로딩 중...</p>}
        </div>
    );
};

export default MyPage;
