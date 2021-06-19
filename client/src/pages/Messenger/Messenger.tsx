import React, { useState, useRef, useEffect } from "react";
import Message from "../../components/message/Message";
import { dummyDeveloper, getRandomBg } from "../../utility/static";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";

import "./Messenger.scss";
import axios, { AxiosResponse } from "axios";
import { getConfig } from "@testing-library/react";
import { httpGET, httpPOST } from "../../utility/http";



const MessengerPage: React.FC<any> = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null as any);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef<null | HTMLDivElement>(null)
    // let user = { name: 123, id: 1 };

    //const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);
    useEffect(() => {
        const getConversations = async () => {
            try {
                //18.185.96.197
                const res = await axios.get("http://18.185.96.197:5000/api/message/Conversation/1");
                setConversations(res as any);
            }
            catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://18.185.96.197:5000/api/message/getMessages/1?withUser=" + currentChat.rcvId);
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
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const messageSend = {
            sndId: 1,
            rcvId: currentChat.rcvId,
            messageTxt: newMessage,
        };
        try {
            const res = await httpPOST("http://18.185.96.197:5000/api/message/sendMessage", messageSend);
            setMessages([...messages, res as any] as any);
            setNewMessage("");
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);
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
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map((m: any) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.rcvId !== 1} />
                                    </div>
                                ))}
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