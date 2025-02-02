import React from "react";
import SocialLoginBtn from "../component/SocialLoginBtn.js"
import Header from "../component/Header.js";
import Navigation from "../component/Navigation.js";
import Footer from "../component/Footer.js";

const LoginPage = () => {
    
    return (
        <div>
            <Header />
            <Navigation />
            <SocialLoginBtn />
            <Footer />
        </div>
    );
};

export default LoginPage