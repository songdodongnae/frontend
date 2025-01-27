import React, {useEffect} from "react";
import { saveToken } from "./TokenStorage";

const CallbackPage = () => {
    useEffect(() => {
        saveToken();
    }, []);

    const token = localStorage.getItem('accessToken');
    return (
        <div>
            <h3>{token}</h3>
        </div>
    );
};

export default CallbackPage