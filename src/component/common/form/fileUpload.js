import styled from "@emotion/styled";
import React, { useRef } from "react";

export default function FileUpload({
  multiple = true,
  value,
  name,
  plusIcon = false,
  icon = "fas fa-camera",
  disabled = false,
  ...props
}) {
  const hiddenFileInput = useRef();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Style {...props}>
      <label onClick={handleClick} className="upload-icon">
        <i className={icon}></i>
      </label>

      <input
        type={"file"}
        value={value}
        name={name}
        multiple={multiple}
        disabled={disabled}
        ref={hiddenFileInput}
        className="d-none"
      />
      {plusIcon && <i className="fas fa-plus plus-icon" />}
    </Style>
  );
}

const Style = styled.span`
  label: file-upload;

  position: relative;
  .upload-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.width ? props.width : "50px")};
    height: ${(props) => (props.height ? props.height : "50px")};
    margin-bottom: 0px;
    padding: 25px;
    border-radius: ${(props) => (props.radius ? props.radius : "50%")};
    border: 3px solid #ffffff;
    background-color: var(--gray-4);
    font-size: ${(props) => (props.iconSize ? props.iconSize : "40px")};
    color: var(--gray-1);
    cursor: pointer;
  }

  .plus-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 16px;
    font-weight: 900;
  }
`;
