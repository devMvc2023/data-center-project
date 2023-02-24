import styled from "@emotion/styled";
import { breakpoint } from "component/common/util";
import { Link } from "react-router-dom";

export default function NavLogo() {
  return (
    <Style>
      <Link to="/" className="home">
        <i className="fas fa-laptop" />
      </Link>
    </Style>
  );
}

const Style = styled.div`
  label: nav-logo;

  display: flex;
  width: fit-content;
  height: 40px;

  .home {
    font-size: 30px;
    color: #ffffff;
  }
`;
