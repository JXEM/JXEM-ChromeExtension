import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import firebase from "firebase/app";
import "./style.css";

const Wrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 16px;
  width: 400px;
  height: 600px;
  background-color: white;
  border: 2px solid black;
  border-radius: 16px;
  padding: 8px;
`;

const ChatView = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatItem = styled.div`
  width: max-content;
  max-width: 300px;
  border-radius: 8px;
  background-color: #facfd2;
  font-size: 24px;
  padding: 8px;
  margin: 8px;
  word-wrap: break-word;
`;

const MyChatItem = styled.div`
  width: max-content;
  max-width: 300px;
  border-radius: 8px;
  background-color: #f5e6ab;
  font-size: 24px;
  padding: 8px;
  margin: 8px;
  word-wrap: break-word;
  align-self: flex-end;
  text-align: right;
`;

const Username = styled.div`
  font-size: 16px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 10%;
  border: none;
  border-top: 1px solid black;
  font-size: 24px;
`;

const Chat = ({ user }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [uid, setUid] = useState("0");
  const [name, setName] = useState("익명");

  const chatViewRef = useRef("");

  useEffect(() => {
    chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight;
  }, [data]);

  useEffect(() => {
    if (user && user.uid && user.displayName) {
      setUid(user.uid);
      setName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    async function getInitData() {
      const db = firebase.database();
      const data = await db.ref("messages/").limitToLast(5).get();
      if (data.exists) {
        const newData = [];
        data.forEach((item) => {
          newData.push(item.val());
        });
        setData(newData);
      }
    }
    function listenData() {
      const db = firebase.database();
      db.ref("messages/").on("child_added", (snapshot) => {
        const data = snapshot.val();
        setData((v) => [...v, data]);
      });
    }
    getInitData();
    listenData();
  }, []);

  function handleSave(e) {
    if (e.code === "Enter") {
      // setData([...data, [, value]]);
      //
      const db = firebase.database();
      db.ref("messages/").push({
        userame: name,
        id: uid,
        message: value,
        createdAt: new Date().toTimeString(),
      });
      setValue("");
    }
  }

  return (
    <Wrapper>
      <ChatView ref={chatViewRef}>
        {data.map((chat, idx) => {
          if (chat.id !== uid) {
            return (
              <ChatItem key={idx}>
                <Username>{chat.username}</Username>
                {chat.message}
              </ChatItem>
            );
          } else if (chat.id === uid) {
            return (
              <MyChatItem key={idx}>
                <Username>{chat.username}</Username>
                {chat.message}
              </MyChatItem>
            );
          }
        })}
      </ChatView>
      <TextInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyPress={handleSave}
        placeholder={"텍스트를 입력해 주세요."}
      />
    </Wrapper>
  );
};

export default Chat;
