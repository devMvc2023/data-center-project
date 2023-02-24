import styled from "@emotion/styled";
import React, { useState } from "react";

function Select({
  icon,
  title,
  data,
  name,
  nested = false,
  style,
  errorMsg,
  placeholder,
  selectPlace,
  disabled = false,
  required = false,
  value,
  onSelectChange = () => null,
  ...props
}) {
  if (style === "2") {
    return (
      <Style {...props} icon={icon}>
        <div className="style-2">
          <label className="select-title">
            {title}
            {required && <span className="text-danger">*</span>}
          </label>
          <select
            className="select"
            onChange={onSelectChange.bind(this)}
            name={name}
            defaultValue={selectPlace}
            value={value}
            disabled={disabled}
          >
            <option disabled className={`first-option`}>
              {selectPlace}
            </option>

            {data?.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  {data !== null && (
                    <option className="second-option" key={index}>
                      {data.name ? data.name : data}
                    </option>
                  )}
                </React.Fragment>
              );
            })}
          </select>
        </div>
        {placeholder && <div className="select-placeholder">{placeholder}</div>}
        {errorMsg && (
          <div className="select-invalid-feedback text-danger">{errorMsg}</div>
        )}
      </Style>
    );
  }

  return (
    <Style {...props}>
      <div className={nested === true ? "select-title nested" : "select-title"}>
        {title}
        {required && <span className="text-danger">*</span>}
      </div>

      <div className={"select-group"}>
        {icon && (
          <div>
            <i className={`fas fa-${icon} select-icon`}></i>
          </div>
        )}

        <select
          className="select"
          onChange={onSelectChange.bind(this)}
          name={name}
          defaultValue={selectPlace}
          value={value}
          disabled={disabled}
        >
          {selectPlace && (
            <option disabled className={`first-option`}>
              {selectPlace}
            </option>
          )}

          {data?.map((data, index) => {
            return (
              <option className="second-option" key={index}>
                {data.name ? data.name : data}
              </option>
            );
          })}
        </select>
      </div>
      {placeholder && <div className="select-placeholder">{placeholder}</div>}
      {errorMsg && (
        <div className="select-invalid-feedback text-danger">{errorMsg}</div>
      )}
    </Style>
  );
}

export default Select;

const Style = styled.div`
  label: select;

  width: ${(props) => (props.width ? props.width : "100%")};
  margin: ${(props) => (props.margin ? props.margin : "18px 0 0 0")};

  .select-title {
    color: var(--gray-1);
    font-size: 14px;
    font-weight: 900;
  }

  .select-group {
    display: flex;
  }

  .nested {
    height: 21px;
  }

  .select {
    width: ${(props) => (props.selectWidth ? props.selectWidth : "100%")};
    height: var(--form-input-height);
    color: var(--gray-1);
    border: ${(props) => (props.border ? props.border : "1px solid #ced4da")};
    border-radius: 4px;
    font-size: 16px;
    padding: 0 0.75rem;
    &:focus {
      outline: none;
      border: 1px solid var(--blue-3);
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }

  .select-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: var(--form-input-height);
    background-color: var(--gray-4);
    font-size: ${(props) => (props.iconSize ? props.iconSize : "16px")};
    color: ${(props) => (props.iconColor ? props.iconColor : "#707070")};
    border-radius: 4px;
  }

  .select-invalid-feedback {
    display: block;
    font-size: 13px;
    width: 100%;
    padding: 1px 6px;
    background-color: #ff000020;
  }

  .select-placeholder {
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-1);
  }

  .style-2 {
    position: relative;
    display: flex;
    align-items: center;

    .select-title {
      font-size: 16px;
      min-width: ${(props) => (props.titleWidth ? props.titleWidth : "180px")};
    }
  }

  .first-option {
    text-align: ${(props) => (props.align ? props.align : "center")};
  }

  .second-option {
    padding: 0.375rem 0.75rem;
  }
`;
