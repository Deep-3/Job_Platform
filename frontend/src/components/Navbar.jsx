import React, { useState } from 'react';
import './Navbar.css';
import { FaUserCircle, FaBars, FaTimes, FaBriefcase } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <a href="/" className="nav-logo">
            <FaBriefcase className="logo-icon" />
            <span className="logo-text">EngineerHub</span>
          </a>
        </div>

        <div className="nav-middle">
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <a href="/jobs" className="nav-link">Find Jobs</a>
            <a href="/companies" className="nav-link">Companies</a>
            <a href="/courses" className="nav-link">Courses</a>
            <a href="/services" className="nav-link">Services</a>
          </div>
        </div>

        <div className="nav-right">
          <div className="auth-buttons">
            <a href="/post-job" className="post-job-btn">Post a Job</a>
            <a href="/login" className="login-btn">Login</a>
            <a href="/register" className="register-btn">
              <FaUserCircle className="user-icon" />
              Sign Up
            </a>
          </div>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <a href="/jobs" className="mobile-link">Find Jobs</a>
        <a href="/companies" className="mobile-link">Companies</a>
        <a href="/courses" className="mobile-link">Courses</a>
        <a href="/services" className="mobile-link">Services</a>
        <div className="mobile-auth">
          <a href="/post-job" className="mobile-post-job">Post a Job</a>
          <a href="/login" className="mobile-login">Login</a>
          <a href="/register" className="mobile-register">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;