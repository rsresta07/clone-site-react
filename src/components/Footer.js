import React from "react";
import "../css/FooterStyles.css";

function Footer() {
    return (
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-xs-20">
                        <ul class="text-center" id="footer-list"></ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-20">
                        <ul class="text-center">
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
                <div class="row">
                    <div class="col-xs-20">
                        <ul class="text-center">
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