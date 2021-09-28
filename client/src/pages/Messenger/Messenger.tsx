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
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null as any);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userImage, setUserImage] = useState([]);
  const [receviedMessage, setReceviedMessage] = useState(null as any);
  const socket = useRef(io());
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { id } = useAuth();

  useEffect(() => {
    // connect to socket
    socket.current = io(
      "wss://" + BASE_URL.split("//")[1].split(":")[0] + ":8900"
    );
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
    // when recive a real-time massage
    if (receviedMessage && currentChat?.rcvId == receviedMessage.sndId) {
      setMessages((prev) => [...prev, receviedMessage] as any);
    }
  }, [receviedMessage]);

  useEffect(() => {
    //report the new user as online to the socket server
    socket.current.emit("addUser", id);
  }, []);

  useEffect(() => {
    //retrive the image for the user
    const getImage = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/user/" + id);
        setUserImage(res as any);
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    //get the user conversations
    const getConversations = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/api/message/Conversation/" + id
        );
        setConversations(res as any);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    // get the user messages
    const getMessages = async () => {
      try {
        const res = await axios.get(
          // Review @ Obada: Url should be an enum
          BASE_URL +
            "/api/message/getMessages/" +
            id +
            "?withUser=" +
            currentChat.rcvId
        );

        setMessages(res as any);
        await axios.put(BASE_URL + "/api/message/readMassages", {
          rcvId: currentChat.rcvId,
          sndId: id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: any) => {
    // sending a message
    e.preventDefault();
    const messageSend = {
      sndId: id,
      rcvId: currentChat.rcvId,
      messageTxt: newMessage,
    };

    try {
      const res = await httpPOST(
        BASE_URL + "/api/message/sendMessage",
        messageSend
      );
      setMessages([...messages, res as any] as any);

      setNewMessage("");
      socket.current.emit("sendMessage", messageSend);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // for auto scrolling when send a massage or load massages
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='messenger'>
      <div className='chatMenu'>
        <div className='chatMenuSearchWrapper'>
          <input
            placeholder='Search for Conversation'
            className='chatMenuInput'
          />
        </div>
        <div className='chatMenuWrapper'>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} />
            </div>
          ))}
        </div>
      </div>
      <div className='chatBox'>
        <div className='chatBoxWrapper'>
          {currentChat ? (
            <>
              <div className='chatBoxTop'>
                {messages.map((massage: any) => (
                  <div ref={scrollRef}>
                    <Message
                      message={massage}
                      own={massage.rcvId !== id}
                      image={massage.rcvId !== id ? userImage : currentChat}
                    />
                  </div>
                ))}
              </div>
              <div className='chatBoxBottom'>
                <textarea
                  className='chatMessageInput'
                  placeholder='write something...'
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}></textarea>
                <button className='chatSubmitButton' onClick={handleSubmit}>
                  ➢
                </button>
              </div>{" "}
            </>
          ) : (
            <span className='noConversationText'>
              Please Chose a Conversation
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default MessengerPage;
