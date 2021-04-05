import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 60px;
  height: 80%;
  background-color: black;
  border: yellow 2px solid;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Button = () => {
  return (
    <Wrapper
      onClick={() => {
        document.getElementById("JXEM-memo").classList.toggle("JXEM-hide");
      }}
    >
      toggle
    </Wrapper>
  );
};

export default Button;
