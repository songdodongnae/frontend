import React from "react";
import SocialLoginBtn from "../component/SocialLoginBtn.js"
import Header from "../component/Header.js";
import Navigation from "../component/Navigation.js";

const LoginPage = () => {
    
    return (
        <div>
            <Header />
            <Navigation />
            <SocialLoginBtn />
        </div>
    );
};

export default LoginPage