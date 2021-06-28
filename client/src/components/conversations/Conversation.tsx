import "./Conversation.scss";
import React, { useState, useEffect } from "react";


const Conversation: React.FC<any> = ({ conversation }) => {
    return (
        <div className="conversation">

            <img
                className="conversationImg"
                src={`http://18.185.96.197:5000/${conversation.image}`}
                alt=""
            />

            <span className="conversationName">{conversation?.Name}</span>
        </div>
    );
};
export default Conversation;
