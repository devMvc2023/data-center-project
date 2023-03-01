import styled from "@emotion/styled";
import { breakpoint } from "component/common/util";
import React from "react";
import Sidebar from "../sidebar";
import NavLogin from "./nav-login";
import NavLogo from "./nav-logo";
import NavMenu from "./nav-menu";

function Navbar() {
  return (
    <Style>
      <div className="blank"></div>

      <div className="navbar">
        <div className="navbar-sidebar">
          <Sidebar className="sideber" />
        </div>
        <div className="navbar-logo">
          <NavLogo />
        </div>
        <div className="navbar-menu">
          <NavMenu />
        </div>
        <div className="navbar-login">
          <NavLogin />
        </div>
      </div>
    </Style>
  );
}

const Style = styled.div`
  label: navbar;

  .navbar {
    position: fixed;
    display: flex;
    top: 0;
    z-index: 800;
    align-items: center;
    height: var(--navbar-height);
    padding: 0 75px 0 75px;
    background: var(--navbar-bgc);
    width: 100%;

    .navbar-menu {
      ${breakpoint("XL")} {
        display: none;
      }
    }

    .navbar-login {
      margin-left: auto;

      ${breakpoint("XL")} {
        display: none;
      }
    }

    ${breakpoint("XL")} {
      justify-content: center;
      padding: 0;

      &-sidebar {
        width: 48%;
      }

      &-logo {
        width: 52%;
      }
    }
  }

  .blank {
    height: var(--navbar-height);
  }

  .sideber {
    display: none;

    ${breakpoint("XL")} {
      display: block;
    }
  }
`;

export default Navbar;
