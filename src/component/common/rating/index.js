import styled from "@emotion/styled";
import React, { useState } from "react";
import { Input } from "../form";
import { PopupJs } from "../popup";

export default function Rating({ data }) {
  return (
    <Style>
      <div className="star">
        <i className="far fa-star" />
        <i className="far fa-star" />
        <i className="far fa-star" />
        <i className="far fa-star" />
        <i className="far fa-star" />
      </div>

      <textarea
        name="rating_comment"
        className={`rating-comment`}
        placeholder="แนะนำ"
      />
    </Style>
  );
}

const Style = styled.div`
  label: rating;

  text-align: center;
  .star {
    font-size: 26px;
    margin-bottom: 10px;
    color: rgb(212, 180, 0);
  }

  .rating-comment {
    width: 92%;
    padding: 10px;
    &:focus {
      overflow: auto;
      outline: none;
    }
  }
`;
