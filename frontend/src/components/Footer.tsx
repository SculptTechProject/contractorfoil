import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../CSS/Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">

                {/* Left Column */}
                <div className="footer-brand" data-aos="fade-up">
                    <h3>ContractorFoil</h3>
                    <p>Manage contractors with ease and efficiency.</p>
                </div>

                {/* Center Column */}
                <div className="footer-links">
                    <div data-aos="fade-right">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#" className="footer-link">Home</a></li>
                            <li><a href="#" className="footer-link">About Us</a></li>
                            <li><a href="#" className="footer-link">Features</a></li>
                            <li><a href="#" className="footer-link">Pricing</a></li>
                        </ul>
                    </div>
                    <div data-aos="fade-left">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#" className="footer-link">Help Center</a></li>
                            <li><a href="#" className="footer-link">Contact Us</a></li>
                            <li><a href="#" className="footer-link">Terms of Service</a></li>
                            <li><a href="#" className="footer-link">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="footer-social" data-aos="fade-up">
                    <h4>Follow Us</h4>
                    <div className="footer-icons">
                        <a href="#" className="footer-icon"><FaFacebook /></a>
                        <a href="#" className="footer-icon"><FaTwitter /></a>
                        <a href="#" className="footer-icon"><FaInstagram /></a>
                        <a href="#" className="footer-icon"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="footer-bottom">
                &copy; 2024 ContractorFoil. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
