import "./Conversation.scss"
import React, { useState, useEffect } from "react";

const Conversation: React.FC<any> = ({ conversation }) => {
    //  const [user, setUser] = useState(null);



    return (
        <div className="conversation">
            <img className="conversationImg" src="https://avatars.githubusercontent.com/u/80964042?v=4" alt="" />
            <span className="conversationName">{conversation?.Name}</span>

        </div>
    );
}
export default Conversation;