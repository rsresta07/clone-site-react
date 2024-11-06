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
        <footer>
            <div className="container">
                {/* First row for the footer items */}
                <div className="row">
                    <div className="col-xs-20">
                        <ul className="text-center">
                            {footerItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li>
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
                        <ul className="text-center">
                            <li>
                                <a href="#">EZTV</a>
                            </li>
                            <li>-</li>
                            <li>
                                <a href="#">YIFY Status</a>
                            </li>
                            <li>-</li>
                            <li>
                                <a href="#">YTS Proxies</a>
                            </li>
                            <li>-</li>
                            <li>
                                <a href="#">YTS Proxies (TOR)</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Third row for the user agreement */}
                <div className="row">
                    <div className="col-xs-20">
                        <ul className="text-center">
                            <li style={{ fontSize: "0.8em" }}>
                                By using this site you agree to and accept our
                                <a href="#">User Agreement</a>, which can be
                                read <a href="#">here</a>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
