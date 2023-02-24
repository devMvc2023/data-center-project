import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

/**
 *
 * @param {{
 * show: boolean,
 * children: Element
 * } & React.HTMLInputElement<T> } props
 * @returns
 */
function Collapse({ show, children, ...props }) {
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (show) {
      mainRef.current.style.height = "100%";
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (show) {
        mainRef.current.style.height = `${contentRef?.current?.clientHeight}px`;
      } else {
        mainRef.current.style.height = "0";
      }
    }
  }, [show, isReady, children]);

  return (
    <Style ref={mainRef} aria-expanded={show} {...props}>
      <div className="collapse-content" ref={contentRef}>
        <div className="collapse-body">{children}</div>
      </div>
    </Style>
  );
}

export default Collapse;

const Style = styled.div`
  label: page-collapse;

  position: relative;
  height: 0px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  .collapse-content {
    padding: 15px 0 0 0;
  }
`;
