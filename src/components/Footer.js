import React from "react";
import "../css/FooterStyles.css";

// Footer items as an array of objects
const footerItems = [
    "YTS © 2011 - 2024",
    "Blog",
    "DMCA",
    "API",
    "RSS",
    "Contact",
    "Browse Movies",
    "Requests",
    "Login",
    "Language",
];

function Footer() {
    return (
        <footer className="bg-[#171717] border-t border-[#2f2f2f] text-white p-5 text-center">
            <div className="footer-container">
                {/* First row for the footer items */}
                <div className="row">
                    <div className="col-xs-20">
                        <ul className="footer-links ">
                            {footerItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li className="footer-link-item">
                                        <a href="#">{item}</a>
                                    </li>
                                    {index < footerItems.length - 1 && (
                                        <li>-</li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Second row for additional links */}
                <div className="row">
                    <div className="col-xs-20">
                        <ul className="footer-links">
                            <li className="footer-link-item">
                                <a href="#">EZTV</a>
                            </li>
                            <li>-</li>
                            <li className="footer-link-item">
                                <a href="#">YIFY Status</a>
                            </li>
                            <li>-</li>
                            <li className="footer-link-item">
                                <a href="#">YTS Proxies</a>
                            </li>
                            <li>-</li>
                            <li className="footer-link-item">
                                <a href="#">YTS Proxies (TOR)</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Third row for the user agreement */}
                <div className="footer-text-sm">
                    <p className="text-[#919191] font-medium footer-agreement">
                        By using this site you agree to and accept our
                        <a href="#">User Agreement</a>, which can be read{" "}
                        <a href="#">here</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
