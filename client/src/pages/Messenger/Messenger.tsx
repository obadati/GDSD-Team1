import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import { dummyDeveloper, getRandomBg } from "../../utility/static";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";

import "./Messenger.scss";
import axios, { AxiosResponse } from "axios";
import { getConfig } from "@testing-library/react";
import { httpGET } from "../../utility/http";



const MessengerPage: React.FC<any> = () => {

    const [currentChat, setCurrentChat] = useState([] as any);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // let user = { name: 123, id: 1 };

    //const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/message/getMessages/1?withUser=" + currentChat.rcvId);
                //" + currentChat?.rcvId as any
                setMessages(res as any);
                console.log(res);

            }
            catch (err) {
                console.log(err);
            }
        };
        getMessages();

    }, [currentChat]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/message/Conversation/1");
                // console.log(res);
                setConversations(res as any);
            }
            catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);
    /*const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sndId: 1,
            rcvId: 2,
            messageTxt: newMessage,
        };
        try {
            const res = await axios.post("http://localhost:5000/api/message/sendMessage", message);
            setMessages([...messages, res] as any)
        }
        catch (err) {
            console.log(err);
        }
    }*/
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuSearchWrapper">
                    <input placeholder="Search for Conversation" className="chatMenuInput" />
                </div>
                <div className="chatMenuWrapper">
                    {conversations.map(c => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} />
                        </div>))
                    }

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (<>
                        <div className="chatBoxTop">
                            {messages.map(m =>
                                <Message message={m} own={m === 1} />
                            )}


                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button className="chatSubmitButton" onClick={handleSubmit}>➢</button>
                        </div> </>) : (<span className="noConversationText">Please Chose a Conversation</span>
                    )}

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