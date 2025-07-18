import React, { useState, useEffect, useRef } from "react"; 
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_icon from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { motion } from "framer-motion";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navRef = useRef();
  const profileRef = useRef(); 
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={navRef}
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" className="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className={`search-box ${isSearchVisible ? "active" : ""}`}>
          <img
            src={search_icon}
            alt="Search"
            className="icons"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
          <input
            type="text"
            placeholder="Search Movies,Series..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div
          className="navbar-profile"
          ref={profileRef}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)} // ✅ Toggle dropdown on click
        >
          <img src={profile_icon} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" />
          <div className={`dropdown ${showProfileDropdown ? "show" : ""}`}> {/* ✅ Use class to show */}
            <p onClick={() => logout()}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
