import React, { useState } from "react";
import styled from "@emotion/styled";
import Collapse from "./collapse";
import { extendesClassname } from "../util";

export function CollapseComplete({
  title,
  defaultShow = false,
  classNameTitle,
  children,
  ...props
}) {
  const [show, setshow] = useState(defaultShow);

  return (
    <Style aria-expanded={show} {...props}>
      <div
        {...extendesClassname(["collapse-title", classNameTitle])}
        onClick={() => setshow(!show)}
      >
        {title}
        <i
          className={`fas ${
            show ? "fa-chevron-up" : "fa-chevron-up fa-rotate-180"
          }`}
        ></i>
      </div>
      <Collapse show={show}>{children}</Collapse>
    </Style>
  );
}

export default CollapseComplete;

const Style = styled.div`
  position: relative;
  border-radius: 15px;
  box-shadow: 0 0 10px #0000001a;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "24px")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 30px 0")};

  .collapse-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.234rem;
    font-weight: 900;
    color: var(--primary-color);
    z-index: 3;
    padding-right: 12px;
    cursor: pointer;

    .fa-chevron-up {
      font-size: 80%;
    }
  }
`;
