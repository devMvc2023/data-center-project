import styled from "@emotion/styled";
import { breakpoint } from "component/common/util";
import useProfile from "hooks/useProfile";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLogin from "../navbar/nav-login";
import Cookies from "universal-cookie";

function Sidebar({ ...props }) {
  const [show, setShow] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { profile, setProfile, link } = useProfile();

  const mainRef = useRef(null);
  const cookies = new Cookies();

  const windowWidth = window.innerWidth;

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const onLogout = () => {
    cookies.remove("_token_");

    setProfile([]);
    navigate("/login");
  };

  useEffect(() => {
    if (show) {
      mainRef.current.style.width = "100%";
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (show) {
        mainRef.current.style.width = windowWidth < 576 ? "100vw" : "450px";
      } else {
        mainRef.current.style.width = "0";
      }
    }
  }, [show, isReady]);

  return (
    <Style aria-expanded={show} {...props}>
      <div
        className={`sidebar-overlay ${show ? "show" : "close"}`}
        onClick={() => setShow(false)}
      ></div>
      <div className="sidebar-open" onClick={() => setShow(!show)}>
        <i className="fas fa-bars" />
      </div>
      <div ref={mainRef} className={`sidebar-body`}>
        <div className="sidebar-close">
          <i className="fas fa-times" onClick={() => setShow(false)} />
        </div>
        <div className="sidebar-contents">
          <div className="sidebar-login">
            <NavLogin dropdown={false} onClose={() => setShow(false)} />
          </div>
          <div className="sidebar-menu">
            <Link
              to="/rehearsal"
              className={`sidebar-menu-item non-margin ${
                pathname === "/rehearsal" || pathname === "/" ? "active" : ""
              }`}
              onClick={() => setShow(false)}
            >
              <div className="menu-icon">
                <i className="fas fa-tasks" />
              </div>
              <div className="menu-title">รายการขอรับบริการ</div>
            </Link>
            <Link
              to="notify"
              className={`sidebar-menu-item ${
                pathname === "/notify" ? "active" : ""
              }`}
              onClick={() => setShow(false)}
            >
              <div className="menu-icon">
                <i className="fas fa-tools" />
              </div>
              <div className="menu-title">ขอรับบริการ</div>
            </Link>
            <Link
              to="statistics"
              className={`sidebar-menu-item ${
                pathname === "/statistics" ? "active" : ""
              }`}
              onClick={() => setShow(false)}
            >
              <div className="menu-icon">
                <i className="fas fa-chart-bar" />
              </div>
              <div className="menu-title">สถิติการบริการ</div>
            </Link>
            <Link
              to="public-relations"
              className={`sidebar-menu-item ${
                pathname === "/public-relations" ? "active" : ""
              }`}
              onClick={() => setShow(false)}
            >
              <div className="menu-icon">
                <i className="fas fa-bullhorn" />
              </div>
              <div className="menu-title">ประชาสัมพันธ์</div>
            </Link>

            {!profile?.data_id && (
              <Link
                to="organizing-team"
                className={`sidebar-menu-item ${
                  pathname === "/organizing-team" ? "active" : ""
                }`}
              >
                <div className="menu-icon">
                  <i className="fas fa-users" />
                </div>
                <div className="menu-title">คณะผู้จัดทำ</div>
              </Link>
            )}
            {(profile?.role === "member" || !profile?.data_id) && link && (
              <a className={`sidebar-menu-item`} href={link} target={"_blank"}>
                <div className="menu-icon">
                  <i className="fas fa-book" />
                </div>
                <div className="menu-title">คู่มือการใช้</div>
              </a>
            )}
          </div>

          {profile?.data_id && (
            <div className="sidebar-menu">
              {profile?.role !== "member" && (
                <Link
                  to="/member"
                  className={`sidebar-menu-item non-margin ${
                    pathname === "/member" ? "active" : ""
                  }`}
                  onClick={() => setShow(false)}
                >
                  <div className="menu-icon">
                    <i className="fas fa-users" />
                  </div>
                  <div className="menu-title">ข้อมูลสมาชิก</div>
                </Link>
              )}
              {(profile?.role === "super admin" || profile?.allow_work) && (
                <Link
                  to="/settings"
                  className={`sidebar-menu-item ${
                    pathname === "/settings" ? "active" : ""
                  }`}
                  onClick={() => setShow(false)}
                >
                  <div className="menu-icon">
                    <i className="fas fa-cog" />
                  </div>
                  <div className="menu-title">ตั้งค่า</div>
                </Link>
              )}

              <Link
                to={`/user/${profile?.data_id}/account`}
                className={`sidebar-menu-item ${
                  pathname === `/user/${profile?.data_id}/account`
                    ? "active"
                    : ""
                }`}
                onClick={() => setShow(false)}
              >
                <div className="menu-icon">
                  <i className="fas fa-user-cog" />
                </div>
                <div className="menu-title">บัญชีของฉัน</div>
              </Link>

              <div className={`sidebar-menu-item`} onClick={onLogout}>
                <div className="menu-icon">
                  <i className="fas fa-sign-out-alt" />
                </div>
                <div className="menu-title">ออกจากระบบ</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Style>
  );
}

export default Sidebar;

const Style = styled.div`
  label: siderbar;

  width: 100%;

  .sidebar-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 981;
    background: #00000050;
    width: 100%;
    height: var(--body-height);
  }

  .sidebar-open {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 60px;
    color: #ffffff;
    font-size: 30px;
  }

  .sidebar-body {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    height: var(--body-height);
    transition: all 0.3s ease-in-out;

    .sidebar-contents {
      width: 100%;
      height: calc(100% - 50px);
      background: #172954;
      padding: 10px 30px;

      .sidebar-login {
        padding: 1.5rem 0;
        border-bottom: 1px solid #ffffff;

        .navbar-user {
          font-size: 1.25rem;

          &:hover {
            cursor: default;
          }
        }
      }

      .sidebar-menu {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 0;
        font-size: 1.25rem;
        border-bottom: 1px solid #ffffff;

        .non-margin {
          margin: 0 20px 0 0;
        }

        &-item {
          display: flex;
          flex-direction: row;
          margin: 10px 20px 0 0;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;

          .menu-icon {
            width: 30px;
          }

          .menu-title {
            width: calc(100% - 30px);

            &:hover {
              cursor: pointer;
            }
          }

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
      }
    }

    .sidebar-close {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 10px 15px;
      font-size: 26px;
      color: var(--gray-1);
      background-color: #ffffff;
    }
  }

  .show {
    display: block;
  }

  .close {
    display: none;
  }
`;
