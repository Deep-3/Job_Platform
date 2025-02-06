import React from 'react';
import './Hero.css';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          Find Your Dream <span className="highlight">Engineering Job</span>
        </h1>
        <p className="hero-subtitle">
          100,000+ engineering jobs from top companies worldwide
        </p>
        
        <div className="search-container">
          <div className="search-box">
            <div className="search-group">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Job title, skills, or company"
                className="search-input"
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-group">
              <FaMapMarkerAlt className="search-icon" />
              <input 
                type="text" 
                placeholder="City or remote"
                className="search-input"
              />
            </div>
            <button className="search-button">
              Search Jobs
            </button>
          </div>
        </div>

        <div className="trending-searches">
          <span className="trending-label">Trending:</span>
          <div className="trending-tags">
            <button className="tag">Software Engineer</button>
            <button className="tag">Full Stack Developer</button>
            <button className="tag">DevOps Engineer</button>
            <button className="tag">Remote</button>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat">
            <span className="stat-number">100K+</span>
            <span className="stat-label">Active Jobs</span>
          </div>
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Engineers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;