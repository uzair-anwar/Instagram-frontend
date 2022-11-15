import "../StyleSheets/messenger.css";
import Conversation from "../Components/Conversations/Conversation";
import Message from "../Components/Message/Message";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const { userToken, userInfo, followings } = useSelector(
    (state) => state.user
  );

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8901");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userInfo?.id);
  }, [userInfo]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER_API}/chat/getMessage/${currentChat?.follower?.id}`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setMessages(data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, userToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiverId = currentChat?.follower?.id;

    const message = {
      userId: userInfo?.id,
      text: newMessage,
      receiverId,
    };

    socket.current.emit("sendMessage", {
      senderId: userInfo?.id,
      receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/chat/send`,
        data: message,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      let tempMessage = [];
      if (messages?.length > 0) {
        tempMessage = [...messages];
      }
      tempMessage.push(data.result);
      setMessages(tempMessage);

      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCurrentConversation = (c) => {
    setCurrentChat(c);
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {followings?.map((c) => (
              <div onClick={() => handleCurrentConversation(c)}>
                <Conversation conversation={c} currentUser={userInfo} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.userId === userInfo?.id} />
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
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
