import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import ReactDOM from "react-dom";
import { breakpoint, extendesClassname } from "../util";
import { Button } from "../page-layout/page-layout";

function RenderPopup(element, properties) {
  return ReactDOM.createPortal(
    <Popup element={element} {...properties} />,
    element
  );
}

/**
 * @version 1.0.2 add properties "classNames" that can custom className popup
 * @version 1.0.1 create
 * @see showClose: true, isClickOutSideClose: true
 *
 * @param {{
 * element: Element,
 * title: string | Element,
 * message: string | Element,
 * icon: 'success' | 'warning' | 'error' | Element,
 * type: 'success' | 'warning' | 'error',
 * maxWidth: string,
 * showClose: boolean | true,
 * isClickOutSideClose: boolean | true,
 * buttons: {
 * label:string,
 * variant:'primary' | 'second' | 'danger' | 'info',
 * action:({loading: (value:boolean)=>void, close: ()=>void, startAction: ()=>void, endAction: ()=>void})
 * }[],
 * classNames:{title: string, message: string, buttons: string}
 * }} props
 * @returns
 */
function Popup({
  element,
  children,
  title,
  message,
  maxWidth = "370px",
  maxHeight,
  buttons,
  tagButtons,
  classNames = { title: "", message: "", buttons: "" },
  showClose,
  isClickOutSideClose,
  onClose,
  ...props
}) {
  const close = () => {
    element.remove();
    onClose();
  };

  return (
    <Style
      className="popupjs-container modal fade show"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      padding={children || message ? "1rem" : "0"}
      {...props}
    >
      {isClickOutSideClose && (
        <div className="popupjs-overlay" onClick={close}></div>
      )}
      <div {...extendesClassname(["popupjs-content"])}>
        {showClose && (
          <div className="popupjs-close-icon" onClick={close}></div>
        )}

        <div {...extendesClassname(["popupjs-title", classNames.title])}>
          {title}
        </div>

        <div {...extendesClassname(["popupjs-body", classNames.message])}>
          {message}
          {children}
        </div>

        {buttons &&
          buttons?.map((button, index) => (
            <div {...extendesClassname(["popupjs-footer", classNames.buttons])}>
              <Button
                key={index}
                type="button"
                onClick={button?.action}
                {...button?.props}
              >
                {button.label}
              </Button>
            </div>
          ))}
        {tagButtons && (
          <div {...extendesClassname(["popupjs-footer", classNames.buttons])}>
            {tagButtons}
          </div>
        )}
      </div>
    </Style>
  );
}

/**
 * @version 1.0.1 create
 * @see showClose: true, isClickOutSideClose: true
 *
 * @param {{
 * open: boolean,
 * title: string | Element,
 * message: string | Element,
 * icon: 'success' | 'warning' | 'error' | Element,
 * type: 'success' | 'warning' | 'error',
 * maxWidth: string,
 * maxHeight: string,
 * showClose: boolean | true,
 * isClickOutSideClose: boolean | true,
 * onClose: ()=> void,
 * buttons: Array.<{
 * label:string,
 * variant:'primary' | 'second' | 'danger' | 'info',
 * action:({loading: (value:boolean)=>void, close: ()=>void, startAction: ()=>void, endAction: ()=>void})
 * }>
 * }} props
 * @returns
 */
function PopupJsx({
  children,
  title,
  message,
  icon,
  buttons,
  tagButtons,
  type,
  maxWidth,
  maxHeight,
  showClose = true,
  isClickOutSideClose = true,
  open,
  onClose = () => null,
  ...props
}) {
  const [element, setElement] = useState();

  useEffect(() => {
    const createPopup = () => {
      const createElement = document.createElement("div");

      createElement.setAttribute("id", "modal1");

      document.body.append(createElement);

      const forceCode = () => {
        createElement.remove();
        window.removeEventListener("onchangepage", forceCode);
      };

      window.addEventListener("onchangepage", forceCode);

      setElement(createElement);
    };
    if (open && !element) {
      createPopup();
    } else if (!open && element) {
      element.remove();
      setElement(null);
    }
  }, [open]);

  if (element) {
    return RenderPopup(element, {
      children,
      title,
      message,
      icon,
      buttons,
      tagButtons,
      type,
      maxWidth,
      maxHeight,
      showClose,
      isClickOutSideClose,
      onClose,
      ...props,
    });
  }

  return null;
}

const PopupJs = {
  jsx: PopupJsx,
};

export { PopupJs, PopupJsx };

const Style = styled.div`
  label: popupjs-container;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #00000050;
  z-index: 800;

  .popupjs {
    width: 100%;
    &-overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #00000050;
    }
    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 90%;
      max-width: ${(props) => props.maxWidth};
      max-height: ${(props) =>
        props.maxHeight ? props.maxHeight : "calc(100vh - 3.5rem)"};
      margin: auto;
      border-radius: 6px;
      z-index: 2;
      background-color: #fff;

      ${breakpoint("LG")} {
        max-width: 93%;
      }

      ${breakpoint("XS")} {
        width: 93%;
      }
    }

    &-body {
      padding: ${(props) => props.padding && props.padding};
      width: 100%;
      overflow-x: auto;

      .body-title {
        color: #ffffff;
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.5rem;
      }

      table {
        th {
          width: 20%;
        }

        td {
          width: 100%;
          padding: 0.3rem;
        }

        .note {
          word-break: break-word;
        }

        .finish-note {
          width: 100%;
          height: 6rem;
          border: none;

          &:focus {
            border: none;
            overflow: auto;
            outline: none;
          }

          &:disabled {
            background-color: #ffffff;
            color: var(--bs-table-color);
          }
        }
      }

      .popup-star {
        font-size: 16px;
        margin-bottom: 10px;
        color: rgb(212, 180, 0);
      }

      .preview-image-group {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .preview-image {
          width: 6.6rem;
          height: 6rem;
          margin: 2px 6px 2px 2px;

          &:hover {
            cursor: zoom-in;
          }

          img {
            object-fit: cover;
          }
        }
      }
    }

    &-close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 1rem;
      height: 1rem;
      font-size: 0;
      border: none;
      padding: 0;
      background-color: transparent;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        top: calc(50% - 2px);
        left: 0;
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: var(--gray-2);
        transform: rotate(45deg);
      }

      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 2px);
        left: 0;
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: var(--gray-2);
        transform: rotate(45deg);
        transform: rotate(-45deg);
      }
    }

    &-title {
      font-size: 1.4em;
      font-weight: 600;
      padding: 1rem;
      color: var(--gray-1);
      border-bottom: 1px solid #dee2e6;

      i {
        margin-right: 10px;
        color: #000000;
      }
    }

    &-footer {
      display: flex;
      z-index: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;

      button {
        &.btn-underline {
          width: fit-content;
          box-shadow: none;
          color: var(--gray-2);
          background-color: transparent;
          font-family: var(--detail2-font-th);
          > span {
            text-decoration: underline;
          }
          &:disabled {
            color: var(--gray-1) !important;
            background-color: transparent !important;
            cursor: not-allowed;
          }
        }
      }

      ${breakpoint("XS")} {
        &.footer-button-revers {
          flex-wrap: wrap-reverse;
        }
      }
    }
  }
`;
