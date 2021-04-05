import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 360px;
  background-color: yellow;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const InjectedApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      const {
        isLoggedIn: newIsLoggedIn,
        user: { displayName },
      } = request;
      setIsLoggedIn(newIsLoggedIn);
      setName(displayName);
    });
  }, []);

  return (
    <Wrapper id="JXEM-memo">
      <UserInfo>
        {isLoggedIn ? <div>{`${name}`}</div> : <div>로그인이 필요합니다.</div>}
      </UserInfo>
    </Wrapper>
  );
};

export default InjectedApp;
