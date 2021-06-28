import "./Conversation.scss"
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api/properties";

const Conversation: React.FC<any> = ({ conversation, image }) => {
    //  const [user, setUser] = useState(null);
    const theip = 'localhost';


    return (
        <div className="conversation">
            <img className="conversationImg" src={`http://` + theip + `:5000/${conversation.image}`} alt="" />
            <span className="conversationName">{conversation?.Name}</span>

        </div>
    );
}
export default Conversation;