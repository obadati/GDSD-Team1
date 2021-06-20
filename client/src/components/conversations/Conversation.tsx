import "./Conversation.scss"
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api/properties";

const Conversation: React.FC<any> = ({ conversation, image }) => {
    //  const [user, setUser] = useState(null);



    return (
        <div className="conversation">
            <img className="conversationImg" src={`http://18.185.96.197:5000/${conversation.image}`} alt="" />
            <span className="conversationName">{conversation?.Name}</span>

        </div>
    );
}
export default Conversation;