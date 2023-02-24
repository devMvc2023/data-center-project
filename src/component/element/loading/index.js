import React from "react";
import styled from "@emotion/styled";

export default function LoadingPage({ loading = false }) {
  if (!loading) {
    return <></>;
  }

  return (
    <Style>
      <div className="spinner"></div>
    </Style>
  );
}

const Style = styled.div`
  label: loader-container;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000050;
  z-index: 999;

  .spinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #3d5af1 transparent #3d5af1 transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
  }

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
