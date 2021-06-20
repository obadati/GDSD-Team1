import React, { useState, useRef, useEffect } from "react";
import Message from "../../components/message/Message";
import { dummyDeveloper, getRandomBg } from "../../utility/static";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";

import "./Messenger.scss";
import axios, { AxiosResponse } from "axios";
import { getConfig } from "@testing-library/react";
import { httpGET, httpPOST } from "../../utility/http";
import { useAuth } from "../../hooks/auth";
import { io } from "socket.io-client";


const MessengerPage: React.FC<any> = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null as any);
    //const [socket, setsocket] = useState(null as any);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receviedMessage, setReceviedMessage] = useState(null as any);
    const socket = useRef(io());
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const { username, email } = useAuth();
    let userId = 0;
    if (username == 'rabia') {
        userId = 4;
    }
    else if (username == 'obada') {
        userId = 1
    }
    //const userId = 1;
    console.log(userId, username, email);
    // let user = { name: 123, id: 1 };

    //const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setReceviedMessage({
                sndId: data.sndId,
                rcvId: data.rcvId,
                messageTxt: data.messageTxt,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        receviedMessage &&
            currentChat?.rcvId == receviedMessage.sndId &&
            setMessages((prev) => [...prev, receviedMessage] as any);
    }, [receviedMessage]);

    useEffect(() => {
        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", users => {
            console.log(users)
        })

    }, []);

    useEffect(() => {
        const getConversations = async () => {
            try {
                //18.185.96.197
                const res = await axios.get("http://18.185.96.197:5000/api/message/Conversation/" + userId);
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
                const res = await axios.get("http://18.185.96.197:5000/api/message/getMessages/" + userId + "?withUser=" + currentChat.rcvId);
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
            sndId: userId,
            rcvId: currentChat.rcvId,
            messageTxt: newMessage,
        };


        try {
            const res = await httpPOST("http://18.185.96.197:5000/api/message/sendMessage", messageSend);
            setMessages([...messages, res as any] as any);
            setNewMessage("");
            socket.current.emit("sendMessage", messageSend);

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
                                        <Message message={m} own={m.rcvId !== userId} />
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