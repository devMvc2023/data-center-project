import styled from "@emotion/styled";
import useProfile from "hooks/useProfile";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function NavLogin({ dropdown = true, onClose = () => null }) {
  const [show, setShow] = useState(false);
  const { profile, setProfile, setEditProfile, setChangePassPath } =
    useProfile();
  const { pathname } = useLocation();

  const cookies = new Cookies();

  const navigate = useNavigate();

  const onLogout = () => {
    // window.localStorage.removeItem("_token_");
    cookies.remove("_token_");
    setProfile([]);
    setEditProfile([]);
    setChangePassPath([]);
    navigate("/login");
  };

  const onCloseSidebar = () => {
    setShow(!show);
    onClose(false);
  };

  return (
    <Style>
      {profile?.data_id ? (
        <>
          <div className="navbar-user" onClick={() => setShow(!show)}>
            <div className="navbar-image">
              {profile.user_image ? (
                <img src={profile?.user_image} />
              ) : (
                <img src={require("image/logo/blankProfile.jpg")} />
              )}
            </div>

            <span className="mx-2">{`${profile?.title}${profile?.first_name} ${profile?.last_name} `}</span>
            {dropdown && (
              <i
                className={`fas ${
                  show ? "fa-chevron-up" : "fa-chevron-up fa-rotate-180"
                }`}
              />
            )}
          </div>

          {dropdown && show && (
            <div className="user-dropdown">
              {profile.role !== "member" && (
                <>
                  <Link to="/member" className="list" onClick={onCloseSidebar}>
                    <div>
                      <i className="fas fa-users" />
                    </div>
                    <div>ข้อมูลสมาชิก</div>
                  </Link>
                  {profile?.role === "super admin" && (
                    <Link
                      to="/settings"
                      className="list"
                      onClick={() => setShow(!show)}
                    >
                      <div>
                        <i className="fas fa-cog" />
                      </div>
                      <div>ตั้งค่า</div>
                    </Link>
                  )}
                  <hr />
                </>
              )}
              <Link
                to={`/user/${profile.data_id}/account`}
                className="list"
                onClick={() => setShow(!show)}
              >
                <div>
                  <i className="fas fa-user-cog" />
                </div>
                <div>บัญชีของฉัน</div>
              </Link>
              <div className="list" onClick={onLogout}>
                <div>
                  <i className="fas fa-sign-out-alt" />
                </div>
                <div>ออกจากระบบ</div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="navbar-regist">
          <Link
            className={`login ${
              pathname === "/login" || pathname === "/" ? "active" : ""
            }`}
            to="/login"
            onClick={() => onClose(false)}
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            className={`signin ${
              pathname === "/signup" || pathname === "/" ? "active" : ""
            }`}
            to="/signup"
            onClick={() => onClose(false)}
          >
            ลงทะเบียน
          </Link>
        </div>
      )}
    </Style>
  );
}

const Style = styled.div`
  label: nav-login;

  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 1000;

  .login {
    color: rgba(255, 255, 255, 0.5);
    padding: 0 15px;
    border-right: 1px solid var(--gray-1);
  }

  .signin {
    color: rgba(255, 255, 255, 0.5);
    padding: 0 15px;
  }

  .navbar-image {
    width: 36px;
    height: 36px;
    overflow: hidden;
    border-radius: 50%;

    img {
      object-fit: cover;
    }
  }

  .active {
    color: #ffffff;
  }

  .navbar-user {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #fff;
    cursor: pointer;
  }

  .user-dropdown {
    position: absolute;
    width: 6rem;
    top: 54px;
    right: 0;
    z-index: 10;
    border-radius: 10px;
    padding: 10px 15px;
    white-space: nowrap;
    background-color: var(--gray-4);
    min-width: 200px;

    > .list {
      display: grid;
      grid-template-columns: 30px auto;
      color: var(--gray-2);
      margin: 10px 0;
      cursor: pointer;
      &:hover {
        color: #008180;
      }
      i {
        margin-right: 10px;
        color: #008180;
      }
    }
  }

  a:hover {
    color: rgba(255, 255, 255, 0.784);
  }
`;
