import React from "react";
import "../css/ContentStyles.css";

function ContentBlock() {
    return (
        <main class="landing">
            <div class="content">
                <h1>Download YTS YIFY movies: HD smallest size</h1>
                <p>
                    Welcome to the official YTS.MX website. Here you can browse
                    and download YIFY movies in excellent <br />
                    720p, 1080p, 2160p 4K and 3D quality, all at the smallest
                    file size. YTS Movies Torrents.
                </p>

                <a href="#">
                    <strong>IMPORTANT</strong> - YTS.MX is the only new official
                    domain for YIFY Movies
                </a>

                <div class="social-links">
                    <img
                        src="/telegram.svg"
                        width="16"
                        height="16"
                        alt="telegram logo"
                    />
                    <a href="#">@YTSMX_UPDATES</a>
                    <label style={{ color: "#ccc" }}> | </label>
                    <img
                        src="/twitter.svg"
                        width="16"
                        height="16"
                        alt="twitter logo"
                    />
                    <a href="#">
                        Follow @YTSYIFY for upcoming featured movies!
                    </a>
                </div>
            </div>

            {/** Data haru chai Dynamically load huncha Javascript file bata */}
            <div id="movies-container"></div>
        </main>
    );
}

export default ContentBlock;