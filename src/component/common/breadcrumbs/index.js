import styled from "@emotion/styled";
import React from "react";
import { breakpoint } from "../util";

export default function Breadcrumbs({ icon, title, ...props }) {
  return (
    <Style {...props}>
      {icon && (
        <div className="breadcrumbs-icon">
          <i className={`${icon}`} />
        </div>
      )}
      {title && <div className="breadcrumbs-title">{title}</div>}
    </Style>
  );
}

const Style = styled.div`
  label: Breadcrumbs;

  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  margin: ${(props) => (props.margin ? props.marign : "0 auto 20px auto")};
  background-color: var(--red-6);
  padding: 24px 12px;
  border-radius: 6px;

  .breadcrumbs-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 100%;
    font-size: 20px;
    color: #707070;
    margin-right: 10px;
  }

  .breadcrumbs-title {
    font-size: 16px;
    font-weight: 900;
    color: var(--gray-1);
  }

  ${breakpoint("MD")} {
    width: 100%;
    padding: 30px 12px;
    border-radius: 6px;
    margin: 0;
  }
`;
