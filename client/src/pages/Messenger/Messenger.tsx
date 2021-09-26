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

  useEffect(() => { // connect to socket
    socket.current = io(
      "ws://" + BASE_URL.split("//")[1].split(":")[0] + ":8900"
    );
    socket.current.on("getMessage", (data) => {
      // Review: Fix spellings
      setReceviedMessage({
        sndId: data.sndId,
        rcvId: data.rcvId,
        messageTxt: data.messageTxt,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {   // when recive a real-time massage
    // Review: Fix spellings
    if (receviedMessage && currentChat?.rcvId == receviedMessage.sndId) {
      setMessages((prev) => [...prev, receviedMessage] as any);
    }
  }, [receviedMessage]);

  useEffect(() => { //report the new user as online to the socket server
    socket.current.emit("addUser", id);
  }, []);

  useEffect(() => { //retrive the image for the user
    const getImage = async () => {
      try {
        // Review: Url should be an enum
        const res = await axios.get(BASE_URL + "/api/user/userImage/" + id);
        setUserImage(res as any);
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
  }, []);
  useEffect(() => {
    // Review: Extract these functions into a service and import into component. The React component should only have presentational logic
    const getConversations = async () => {
      try {
        const res = await axios.get(
          // Review: Url should be an enum
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
    const getMessages = async () => {
      try {
        const res = await axios.get(
          // Review: Url should be an enum
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

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/api/message/Conversation/" + id
        );
        // console.log(res);
        setConversations(res as any);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  const handleSubmit = async (e: any) => {
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
    // Review: should have a nullish check, also any variable accessed inside a useEffect should also be added to the dependency list
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // We use Kebab-case for our css classes and camelCase for jsx variables. Almost all classes below violate this convention
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
          {/**
           * Review: variable should be descriptive 'c' doesn't convey clear intent
           */}
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
