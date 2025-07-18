import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Trim the search query to handle whitespace
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=878dfbfb87b2f460b1da13d49de634ac&query=${trimmedQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results || []); 
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };

    
    const searchTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300); 

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="hero">
        <motion.img
          src={hero_banner}
          alt=""
          className="banner-img"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="hero-caption">
          <motion.img
            src={hero_title}
            alt=""
            className="caption-img"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </motion.p>
          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="btn">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </motion.div>
        </div>
      </div>

      <div className="more-cards">
        {searchQuery.trim() !== "" ? (
          <div className="title-cards">  
            <h2>Search Results for "{searchQuery}"</h2>
            <div className="card-list">
              {searchResults.length > 0 ? (
                searchResults
                  .filter((movie) => movie.backdrop_path) 
                  .map((movie) => (
                    <Link
                      to={`/player/${movie.id}`}
                      className="card"
                      key={movie.id}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.original_title} 
                      />
                      <p>{movie.original_title}</p>
                    </Link>
                  ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        ) : (
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        )}

        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;