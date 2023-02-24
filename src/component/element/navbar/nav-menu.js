import styled from "@emotion/styled";
import { breakpoint } from "component/common/util";
import useProfile from "hooks/useProfile";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu() {
  const { pathname } = useLocation();
  const { profile } = useProfile();

  return (
    <Style>
      <Link
        to="/rehearsal"
        className={`nav-menu ${
          pathname === "/rehearsal" || pathname === "/" ? "active" : ""
        }`}
      >
        <i className="fas fa-tasks" />
        รายการขอรับบริการ
      </Link>
      <Link
        to="notify"
        className={`nav-menu ${pathname === "/notify" ? "active" : ""}`}
      >
        <i className="fas fa-bell"></i>
        ขอรับบริการ
      </Link>
      <Link
        to="statistics"
        className={`nav-menu ${pathname === "/statistics" ? "active" : ""}`}
      >
        <i className="fas fa-chart-bar" />
        สถิติการบริการ
      </Link>
      {!profile?.data_id && (
        <Link
          to="organizing-team"
          className={`nav-menu ${
            pathname === "/organizing-team" ? "active" : ""
          }`}
        >
          <i className="fas fa-users" />
          คณะผู้จัดทำ
        </Link>
      )}
      {profile?.data_id && (
        <>
          {profile?.role !== "member" && (
            <Link
              to="member"
              className={`nav-menu ${pathname === "/member" ? "active" : ""}`}
            >
              <i className="fas fa-users" />
              ข้อมูลสมาชิก
            </Link>
          )}
          {(profile?.role === "super admin" || profile?.allow_work) && (
            <Link
              to="settings"
              className={`nav-menu ${pathname === "/settings" ? "active" : ""}`}
            >
              <i className="fas fa-cog" />
              ตั้งค่า
            </Link>
          )}
        </>
      )}
    </Style>
  );
}

const Style = styled.div`
  label: nav-menu;

  position: relative;
  margin-left: 40px;
  font-size: 1rem;
  font-weight: 900;

  .nav-menu {
    margin-right: 20px;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .active {
    color: #ffffff;
  }

  i {
    margin-right: 6px;
  }

  ${breakpoint("LG")} {
    display: none;
  }
`;
