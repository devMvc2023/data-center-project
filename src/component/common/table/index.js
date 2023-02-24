import styled from "@emotion/styled";
import React from "react";

export default function Table({ th, td, className = "", ...props }) {
  return (
    <Style className="table-responsive table-body" {...props}>
      <table className={`table ${className}`}>
        <thead className="thead-light">
          <tr>
            {th?.map((th, index) => {
              if (th !== null) {
                return <th key={index}>{th}</th>;
              }
            })}
          </tr>
        </thead>

        <tbody>{td}</tbody>
      </table>
    </Style>
  );
}

const Style = styled.div`
  label: table;

  thead {
    text-align: center;
  }

  th {
    color: #495057;
    background-color: #e9ecef;
    border: 1px solid #dee2e6;
    padding: 0.2rem 0.2rem;
  }

  td {
    border: 1px solid #dee2e6;
    align-items: center;
  }

  .body {
    border: none;

    .repairs-list {
      display: flex;
      i {
        margin-right: 6px;
      }
    }

    .detail {
      padding: 0;
    }

    &:hover {
      background-color: #dee2e660;
    }
  }

  .rehearsal-content {
    overflow: auto;
  }
`;
