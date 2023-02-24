import styled from "@emotion/styled";
import { breakpoint } from "../util";

const Header = styled.header`
  label: page-header;

  position: relative;
  width: 100%;
`;

const Main = styled.div`
  label: main;

  position: relative;
  width: 100%;
  min-height: calc(var(--body-height) - var(--navbar-height));
`;

const Contents = styled.div`
  label: page-contents;

  position: relative;
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "1000px")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "fit-content")};
  padding: ${(props) => (props.padding ? props.padding : "15px")};
  border-radius: ${(props) => (props.radius ? props.radius : "8px")};
  background-color: ${(props) => (props.bgc ? props.bgc : "none")};
  box-shadow: ${(props) =>
    props.shadow ? props.shadow : "0 0 10px #0000001a"};
  margin: ${(props) => (props.margin ? props.marign : "auto")};
`;

const Panel = styled.div`
  label: panel;

  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "100%")};
  background-color: ${(props) => (props.bgc ? props.bgc : "none")};
  padding: 24px;
  margin: ${(props) => (props.margin ? props.marign : "0")};
  border-radius: 12px;
  box-shadow: 0 0 10px #0000001a;

  &[data-type="title"] {
    font-size: 18px;
    color: ${(props) => (props.textColor ? props.textColor : "#000000")};
    justify-content: center;
    flex-direction: row;
    padding: 0;
  }
`;

const Section = styled.section`
  label: section;

  position: relative;
  width: 100%;
  padding: 26px 45px;
  min-height: calc(var(--body-height) - var(--breadcrumbs-height));

  ${breakpoint("MD")} {
    padding: 0;
  }
`;

const FormFooter = styled.div`
  label: footer-form;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  height: var(--form-footer-height);
  margin: auto auto 0 auto;
  padding: 24px;
`;

const Button = styled.button`
  label: buttom;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.padding ? props.padding : "6px 12px")};
  width: ${(props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "35px")};
  border: none;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "6px"};
  background-color: ${(props) => (props.bgc ? props.bgc : "var(--red-2)")};
  color: ${(props) => (props.textColor ? props.textColor : "#ffffff")};
  margin: ${(props) => (props.margin ? props.margin : "0 auto")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  font-weight: 900;
  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const Group = styled.div`
  label: group;

  display: flex;
  justify-content: space-between;
`;

const Group2 = styled.div`
  label: group;

  display: flex;
  margin: ${(props) => (props.margin ? props.margin : "none")};
`;

export {
  Main,
  Contents,
  Panel,
  FormFooter,
  Button,
  Section,
  Header,
  Group,
  Group2,
};
