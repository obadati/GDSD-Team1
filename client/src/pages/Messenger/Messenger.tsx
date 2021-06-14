import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import { dummyDeveloper, getRandomBg } from "../../utility/static";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";

import "./Messenger.scss";
import axios, { AxiosResponse } from "axios";
import { getConfig } from "@testing-library/react";

interface ConversationState {
    rcvId: number,
    Name: string,
    lastMessage: string,
}
const defaultConversations: ConversationState[] = [];

const MessengerPage: React.FC<any> = () => {
    //  const history = useHistory();
    let messagesState = {};
    const isAdmin = { rcvId: 5, Name: 'Ahmad' };
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    // let user = { name: 123, id: 1 };

    //const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/message/getMessages/1?withUser=2");
                setMessages(res as any);
            }
            catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [])
    console.log(messages)

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/message/Conversation/1", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                // const { res } = { data: { id: 5, rcid: 4 } } as any;
                console.log(res);
                setConversations([]);
            }
            catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);




    console.log(messages)
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuSearchWrapper">
                    <input placeholder="Search for Conversation" className="chatMenuInput" />
                </div>
                <div className="chatMenuWrapper">
                    {messages.map(c => <Conversation />)}


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