import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import { dummyDeveloper, getRandomBg } from "../../utility/static";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";

import "./Messenger.scss";
import axios, { AxiosResponse } from "axios";
import { getConfig } from "@testing-library/react";


const MessengerPage: React.FC<any> = () => {
    //  const history = useHistory();
    const [conversations, setConversations] = useState<any[]>([]);
    const user = { name: 123, id: 1 };
    //const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/message/Conversation/1");
                // const { res } = { data: { id: 5, rcid: 4 } } as any;
                //console.log(res);
                setConversations(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user.id]);

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuSearchWrapper">
                    <input placeholder="Search for Conversation" className="chatMenuInput" />
                </div>
                <div className="chatMenuWrapper">
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />

                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                        <button className="chatSubmitButton">➢</button>
                    </div>

                </div>
            </div>

            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    )
};
export default MessengerPage;