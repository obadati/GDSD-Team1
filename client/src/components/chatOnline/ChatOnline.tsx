import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.scss";

export default function ChatOnline() {

    return (
        <div className="chatOnline">

            <div className="chatOnlineFriend" >
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src="https://avatars.githubusercontent.com/u/80964042?v=4"
                        alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Ahmad Smith</span>
            </div>

        </div>
    );
}
