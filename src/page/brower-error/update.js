import styled from "@emotion/styled";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import React from "react";

export default function Update() {
  return (
    <StyleExtendsSection>
      <Contents className="update-contents">
        <div className="update-title">อยู่ระหว่างการจัดทำ</div>
      </Contents>
    </StyleExtendsSection>
  );
}

const StyleExtendsSection = styled(Section)`
  label: password;

  display: flex;

  .update-title {
    text-align: center;
    font-size: 40px;
    font-weight: 800;
  }

  .update-contents {
    padding: 20px 26px;
    max-width: 600px;

    .signin-icon {
      width: 100px;
      height: 100px;
      margin: 20px auto;
    }

    ${breakpoint("XS")} {
      padding: 20px 16px;
    }
  }

  ${breakpoint("XS")} {
    padding: 26px 20px;
  }
`;
