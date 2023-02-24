import styled from "@emotion/styled";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import React from "react";
import { Link } from "react-router-dom";

export default function NeedUser() {
  return (
    <StyleExtendsSection>
      <Contents className="need-contents">
        <div className="signin-icon">
          <img src={require("image/signin.png")} alt="signin" />
        </div>
        <div className="need-title">
          <Link to="/login">กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน</Link>
        </div>
      </Contents>
    </StyleExtendsSection>
  );
}

const StyleExtendsSection = styled(Section)`
  label: password;

  display: flex;

  .need-title {
    text-align: center;
    font-size: 40px;
    font-weight: 800;
  }

  .need-contents {
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
