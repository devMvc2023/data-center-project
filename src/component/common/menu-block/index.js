import styled from "@emotion/styled";
import React from "react";
import { Image } from "react-bootstrap";

export default function Block({ title, image, onClick = () => null }) {
  return (
    <Style onClick={onClick}>
      <div className="block-image">
        <Image src={image} />
      </div>
      <div className="block-title">{title}</div>
    </Style>
  );
}

const Style = styled.div`
  label: block;

  position: relative;
  text-align: center;
  width: ${(props) => (props.width ? props.width : "300px")};
  height: ${(props) => (props.height ? props.height : "200px")};
  background-color: #fbdad9;
  padding: 15px;
  margin: ${(props) => (props.margin ? props.marign : "40px")};
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;

  .block-image {
    margin: auto;
    width: 160px;
    height: 140px;
  }

  .block-title {
    font-weight: 900;
    font-size: 24px;
  }

  &:active {
    background-color: #fbdad980;
  }

  &:hover {
    color: var(--red-4);
    cursor: pointer;
  }
`;
