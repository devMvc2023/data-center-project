import styled from "@emotion/styled";
import { Section } from "component/common/page-layout/page-layout";
import Notify from "page/notify";
import Rehersal from "page/rehearsal";
import Login from "page/user-login";
import Signup from "page/user-signup";
import React from "react";

function Home() {
  return (
    <StyleExtendsSection>
      <Rehersal />
    </StyleExtendsSection>
  );
}

export default Home;

const StyleExtendsSection = styled(Section)`
  label: home;

  position: relative;
  min-height: calc(var(--body-height) - var(--navbar-height));
`;
