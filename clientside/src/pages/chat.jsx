import React, { useEffect, useState, useRef } from "react";
import Loader2 from "../components/loader/loader2";
import SingleMessage from "../components/message/singleMessage";
import openSocket from "socket.io-client";
import $ from "jquery";

const Chat = (props) => {
  const [isRendering, setIsRendering] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [invalidMessage, setInvalidMessage] = useState({});
  const [oldMessages, setOldMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8080/chatMessage/getAll")
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (responseData.error) {
            props.errorHandler({ responseData });
          } else {
            setOldMessages(responseData);
            applySocket();
            setIsRendering(false);
            document.getElementById("chatContainer").scrollTop =
              document.getElementById("chatContainer").scrollHeight;
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  const applySocket = () => {
    const socket = openSocket("http://localhost:8080");
    socket.emit("userData", { currentUser: props.userDetail });
    socket.on("greetUser", (data) => {
      newMemberJoined(data.currentUser);
    });
    socket.on("leavingChat", () => {
      leftTheChat();
    });
    socket.on("myMessage", (data) => {
      if (data.action === "receiveMessage") {
        setNewMessages(() => {
          newMessages.push(data.message);
          return newMessages;
        });
        setInvalidMessage({});
        document.getElementById("chatContainer").scrollTop =
          document.getElementById("chatContainer").scrollHeight;
      }
    });
  };
  const newMemberJoined = (userData) => {
    $("#allChat").html(
      $("#allChat").html() +
        `<div class="container"><div class="border">
   <div class="p-3 text-center">
     <img
       src=${"http://localhost:8080/" + userData.imageUrl}
       alt=""
       width="120"
     />
   </div>
   <div class="p-3 text-center">
     <h5>${userData.username} has joined the chat</h5>
     <p>Email: ${userData.email}</p>
   </div>
 </div></div>`
    );
  };
  const leftTheChat = (userData) => {
    $("#allChat").html(
      $("#allChat").html() +
        `<div class="container"><div class="border my-2">
        <h1 class="text-center">A User has left the chat</h1>
 </div></div>`
    );
  };
  const messageChangeHandler = (event) => {
    setCurrentMessage(event.target.value);
    setInvalidMessage({});
  };
  const messageSendHandler = (event) => {
    event.preventDefault();
    if (currentMessage === "") {
      setInvalidMessage({ backgroundColor: "#ff8f8f", borderColor: "red" });
      return;
    }
    const message = currentMessage;
    setCurrentMessage("");
    fetch("http://localhost:8080/chatMessage/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        userId: props.userDetail.userId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.error) {
          props.errorHandler({ responseData });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      {isRendering ? (
        <Loader2 isRendering={isRendering} />
      ) : (
        <div>
          <h1 className="text-center mt-5">CHAT ROOM</h1>
          <div
            className="container text-white bg-light-black height-65vh border-radius-25 p-4 mt-5 overflow-auto"
            id="chatContainer"
          >
            <div className="container" id="allChat">
              {oldMessages.messages.map((message, index) => (
                <SingleMessage
                  message={message}
                  myUserDetail={props.userDetail}
                  key={index}
                />
              ))}
              {newMessages.map((message, index) => (
                <SingleMessage
                  message={message}
                  myUserDetail={props.userDetail}
                  key={index}
                />
              ))}
            </div>
          </div>
          <form onSubmit={messageSendHandler}>
            <div className="container mt-2 d-flex bg-light-black border-radius-25 p-3">
              <input
                type="text"
                value={currentMessage}
                className="form-control"
                onChange={messageChangeHandler}
                style={invalidMessage}
                placeholder="Write your message here..."
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Chat;
