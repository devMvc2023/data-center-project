import styled from "@emotion/styled";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import React from "react";

export default function NotFound() {
  return (
    <StyleExtendsSection>
      <Contents className="not-contents">
        <div className="not-title">
          <div>ไม่เจอหน้านี้</div>
        </div>
      </Contents>
    </StyleExtendsSection>
  );
}

const StyleExtendsSection = styled(Section)`
  label: password;

  display: flex;

  .not-title {
    align-items: center;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
  }

  .not-contents {
    padding: 20px 26px;
    max-width: 800px;

    ${breakpoint("XS")} {
      padding: 20px 16px;
    }
  }

  ${breakpoint("XS")} {
    padding: 26px 20px;
  }
`;
