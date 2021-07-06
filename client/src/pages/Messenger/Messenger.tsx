import React, { useState, useRef, useEffect } from "react";
import Message from "../../components/message/Message";
import Conversation from "../../components/conversations/Conversation";
import "./Messenger.scss";
import axios from "axios";
import { httpPOST } from "../../utility/http";
import { useAuth } from "../../hooks/auth";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/constants";

const MessengerPage: React.FC<any> = () => {
    // define the use state for react setter and getters and retive the user id from login
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null as any);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userImage, setUserImage] = useState([]);
    const [receviedMessage, setReceviedMessage] = useState(null as any);
    const socket = useRef(io());
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const { id } = useAuth();
    // to open a socket after accessing the page and reveive a massage that was sent to the user in real time
    useEffect(() => {
        socket.current = io("ws://" + BASE_URL.split('//')[1].split(':')[0] + ":8900");
        socket.current.on("getMessage", (data) => {
            setReceviedMessage({
                sndId: data.sndId,
                rcvId: data.rcvId,
                messageTxt: data.messageTxt,
                createdAt: Date.now(),
            });
        });
    }, []);
    // to check if the user have to conversation of the massage that just arrived open, it will show it right away
    useEffect(() => {
        if (receviedMessage && currentChat?.rcvId == receviedMessage.sndId) {
            setMessages((prev) => [...prev, receviedMessage] as any);
        }
    }, [receviedMessage]);
    // to send the user information to the socket notifing it that the user is online
    useEffect(() => {
        socket.current.emit("addUser", id);
    }, []);
    //  to get the image of the login user in order to show it in the chat
    useEffect(() => {
        const getImage = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/api/user/userImage/" + id);
                setUserImage(res as any);
            } catch (err) {
                console.log(err);
            }
        };
        getImage();
    }, []);
    // to get the conversations that the user have (order and filtarting is done from backend)
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/api/message/Conversation/" + id);
                setConversations(res as any);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);
    // to retrive the massages for the user ( this is after the user click on a conversation )
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/api/message/getMessages/" + id + "?withUser=" + currentChat.rcvId);
                setMessages(res as any);
                await axios.put(BASE_URL + "/api/message/readMassages", { rcvId: currentChat.rcvId, sndId: id });
            } catch (err) {
                console.log(err);
            }
        }; getMessages();
    }, [currentChat]);

    // handle the send button inside the conversation and record it with a post request in database and send it to socket 
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const messageSend = {
            sndId: id,
            rcvId: currentChat.rcvId,
            messageTxt: newMessage,
        };
        try {
            const res = await httpPOST(
                BASE_URL + "/api/message/sendMessage", messageSend);
            setMessages([...messages, res as any] as any);
            setNewMessage("");
            socket.current.emit("sendMessage", messageSend);
        }
        catch (err) {

            console.log(err);
        }
    };

    // to auto scroll the chat when clicking on a conversation or when new massage arrived
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    //the dynamic html script the desplay the conversation and chat windows and calling for conversations and massages componants
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuSearchWrapper">
                    <input
                        placeholder="Search for Conversation"
                        className="chatMenuInput"
                    />
                </div>
                <div className="chatMenuWrapper">
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (<>
                        <div className="chatBoxTop">
                            {messages.map((m: any) => (
                                <div ref={scrollRef}>
                                    <Message
                                        message={m}
                                        own={m.rcvId !== id}
                                        image={m.rcvId !== id ? userImage : currentChat}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e) =>
                                    setNewMessage(e.target.value)
                                }
                                value={newMessage}
                            ></textarea>
                            <button
                                className="chatSubmitButton"
                                onClick={handleSubmit}
                            >
                                ➢
                            </button>
                        </div>{" "}
                    </>
                    ) : (
                        <span className="noConversationText">
                            Please Chose a Conversation
                        </span>)}
                </div>
            </div>
        </div>);
};
export default MessengerPage;
