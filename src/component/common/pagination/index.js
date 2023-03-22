import styled from "@emotion/styled";
import React, { useState } from "react";

function Pagination({ perPage, totalData, page, paginate = () => null }) {
  let currentPage = page;

  const [itemsPerPage, setitemsPerPage] = useState(perPage);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalData / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} className="page-item">
          <a
            onClick={() => paginate(number)}
            className={`page-link ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </a>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNext = () => {
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);

    paginate(maxPageNumberLimit + 1);
  };

  const handlePrev = () => {
    setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);

    paginate(minPageNumberLimit);
  };

  const nextbtn = () => {
    paginate(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      handleNext();
    }
  };

  const prevbtn = () => {
    paginate(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      handlePrev();
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNext} className="page-item">
        <a className="page-link">&hellip;</a>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handlePrev} className="page-item">
        <a className="page-link">&hellip;</a>
      </li>
    );
  }

  return (
    <Style>
      {pages.length > 0 && (
        <>
          <div className="block"></div>
          <ul className="pagination">
            <li
              className={`page-item ${
                currentPage == pages[0] ? "disabled" : null
              }`}
            >
              <a className="page-link" onClick={prevbtn}>
                ย้อนกลับ
              </a>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li
              className={`page-item ${
                currentPage == pages[pages.length - 1] ? "disabled" : null
              }`}
            >
              <a className="page-link" onClick={nextbtn}>
                ต่อไป
              </a>
            </li>
          </ul>
        </>
      )}
    </Style>
  );
}

export default Pagination;

const Style = styled.div`
  label: paginate;

  display: flex;
  justify-content: center;
  ul {
    position: absolute;
    bottom: 0;
    margin-bottom: 1.5rem;

    a {
      text-decoration: none;
      &:hover {
        cursor: pointer;
      }
    }

    .active {
      border-color: #007bff;
      color: #fff;
      background-color: #007bff;
    }
  }

  .block {
    height: 60px;
    width: 100%;
  }
`;
