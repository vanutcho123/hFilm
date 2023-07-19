// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <div className="" style={{ height: 1000 }}></div>
    </div>
  );
};

export default Home;
