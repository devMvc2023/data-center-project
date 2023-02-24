import styled from "@emotion/styled";
import React from "react";

function Input({
  title,
  type,
  children,
  icon,
  placeholder,
  placeholder2,
  errorMsg,
  name,
  style,
  value,
  defaultValue,
  defaultChecked,
  disabled = false,
  required = false,
  pattern,
  radioClick = () => null,
  ...props
}) {
  if (style === "2") {
    return (
      <Style {...props} icon={icon}>
        <div className="style-2 align-items-center">
          <label className="input-title">
            {title}
            {required && <span className="text-danger">*</span>}
          </label>
          <div className="input">
            <input
              type={type}
              name={name}
              defaultValue={defaultValue}
              required={required}
              disabled={disabled}
              multiple
              pattern={pattern}
              placeholder={placeholder2}
            />
          </div>
        </div>
        {placeholder && <div className="input-placeholder">{placeholder}</div>}
        {errorMsg && (
          <div className="input-invalid-feedback text-danger">{errorMsg}</div>
        )}
      </Style>
    );
  }
  if (style === "3") {
    return (
      <Style {...props} icon={icon}>
        <div className="style-2">
          <label className="input-title">
            {title}
            {required && <span className="text-danger">*</span>}
          </label>

          <div>
            <textarea name={name} required={required} disabled={disabled} />

            {placeholder && (
              <div className="input-placeholder">{placeholder}</div>
            )}
            {errorMsg && (
              <div className="input-invalid-feedback text-danger">
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </Style>
    );
  }

  if (style === "4") {
    return (
      <StyleRadio {...props}>
        <div className="radio-group">
          <input
            type={type || "radio"}
            name={name}
            onClick={radioClick}
            className="radio"
            required={required}
            disabled={disabled}
            value={value}
            defaultChecked={defaultChecked}
            pattern={pattern}
            placeholder={placeholder2}
          />
          <div>
            <span className="input-title">
              {title}
              {required && <span className="text-danger">*</span>}
            </span>
          </div>
        </div>
        {placeholder && <div className="input-placeholder">{placeholder}</div>}
        {errorMsg && (
          <div className="input-invalid-feedback text-danger">{errorMsg}</div>
        )}
      </StyleRadio>
    );
  }

  return (
    <Style {...props} icon={icon}>
      <label className="input-title">
        {title}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-group">
        {icon && <i className={`${icon} input-icon`}></i>}
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          placeholder={placeholder2}
        />
      </div>
      {placeholder && <div className="input-placeholder">{placeholder}</div>}
      {errorMsg && (
        <div className="input-invalid-feedback text-danger">{errorMsg}</div>
      )}
    </Style>
  );
}

export default Input;

const Style = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  margin: ${(props) => (props.margin ? props.margin : "15px 0 0 0")};

  .input-title {
    color: ${(props) =>
      props.titleColor ? props.titleColor : "var(--gray-1)"};
    font-size: 14px;
    font-weight: 900;
  }

  .input-invalid-feedback {
    display: block;
    font-size: 13px;
    width: 100%;
    padding: 1px 6px;
    background-color: #ff000020;
  }

  .input-placeholder {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-1);
  }

  .input-group {
    display: flex;
    width: 100%;
    .input-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: var(--form-input-height);
      background-color: var(--gray-4);
      font-size: ${(props) => (props.iconSize ? props.iconSize : "16px")};
      color: ${(props) => (props.iconColor ? props.iconColor : "#707070")};
      border-radius: 4px;
    }
  }

  input,
  textarea {
    width: ${(props) =>
      props.icon || props.inputWidth
        ? props.inputWidth || "calc(100% - 40px)"
        : "100%"};
    height: ${(props) =>
      props.height ? props.height : "var(--form-input-height)"};
    border: ${(props) => (props.border ? props.border : "1px solid #ced4da")};
    border-radius: 4px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
    padding: 0.375rem 0.75rem;
    &:focus {
      outline: none;
      border: 1px solid var(--blue-3);
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    > {
      margin: 20px;
    }
  }

  /* Works for Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Works for Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .style-2 {
    position: relative;
    display: flex;

    .input-title {
      font-size: 16px;
      min-width: ${(props) => (props.titleWidth ? props.titleWidth : "180px")};
    }
  }
`;

const StyleRadio = styled.div`
  display: flex;
  align-items: left;
  flex-wrap: nowrap;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "fit-content")};
  margin: ${(props) => (props.margin ? props.margin : "15px 0 0 0")};
  height: ${(props) =>
    props.height ? props.height : "var(--form-input-height)"};

  .radio {
    margin-right: 4px;
  }

  .radio-group {
    display: flex;
    align-items: baseline;
  }

  .input-title {
    color: ${(props) =>
      props.titleColor ? props.titleColor : "var(--gray-1)"};
    font-size: 16px;
    font-weight: 900;
  }

  .input-invalid-feedback {
    display: block;
    font-size: 12px;
  }

  .input-placeholder {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-1);
  }
`;
