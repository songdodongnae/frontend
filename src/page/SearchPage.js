import React from "react";
import Header from "../component/Header.js";
import Navigation from "../component/Navigation.js";
import Footer from "../component/Footer.js";
import Search from "../component/Search.js";

const SearchPage = () => {
    
    return (
        <div>
            <Header />
            <Navigation />
            <div className="pt-48 flex justify-center ">
            <Search />
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage