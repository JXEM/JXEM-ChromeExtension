import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  color: black;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = () => {
  return (
    <Wrapper
      onClick={() => {
        document.getElementById("JXEM-memo").classList.toggle("JXEM-hide");
      }}
    >
      <Content>J</Content>
    </Wrapper>
  );
};

export default Button;
