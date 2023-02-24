import styled from "@emotion/styled";
import React from "react";

function Message({ title, detail, ...props }) {
  return (
    <Style {...props}>
      <label className="message-title">{title}</label>
      <div className="message-detail">{detail}</div>
    </Style>
  );
}

const Style = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => (props.mt ? props.mt : "15px")};

  .message-title {
    min-width: ${(props) => (props.width ? props.width : "180px")};
    color: ${(props) =>
      props.titleColor ? props.titleColor : "var(--gray-1)"};
    font-size: 16px;
    font-weight: 900;
  }

  .message-detail {
    font-size: 14px;
    font-weight: 550;
    color: ${(props) =>
      props.detailColor ? props.detailColor : "var(--gray-1)"};
  }
`;

function Message2({ title, detail, ...props }) {
  return (
    <Style2 {...props}>
      <label className="message-title">{title}</label>
      <div className="message-detail">{detail}</div>
    </Style2>
  );
}

export { Message, Message2 };

const Style2 = styled.div`
  label: message2;

  margin-bottom: 12px;
  padding: 0 15px 0 0;
  font-weight: 900;

  .message-title {
    font-size: 0.8rem;
    color: var(--gray-1);
  }
`;
