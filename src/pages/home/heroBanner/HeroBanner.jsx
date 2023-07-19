import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const HeroBanner = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  console.log(backgrounds);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (!loading && data?.results) {
      const bgs = data.results.map((item) => ({
        backdrop_path: url.backdrop + item.backdrop_path,
      }));
      setBackgrounds(bgs);
    }
  }, [data, loading, url.backdrop]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {backgrounds.length > 0 && ( // Check if there are backgrounds to display
        <Carousel
          showThumbs={false}
          showArrows={false}
          interval={7000}
          autoPlay
          infiniteLoop
        >
          {backgrounds.map((bg, index) => (
            <div key={index} className="banner-img">
              <img src={bg.backdrop_path} />
            </div>
          ))}
        </Carousel>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome to hFilm</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now
          </span>
          <div className="searchInput">
            <input
              type="text"
              name=""
              placeholder="Search for a movie or tv show..."
              id=""
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
