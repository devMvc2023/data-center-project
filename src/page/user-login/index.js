import styled from "@emotion/styled";
import {
  Button,
  Contents,
  Section,
} from "component/common/page-layout/page-layout";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { Input, Message } from "component/common/form";
import { breakpoint } from "component/common/util";
import { GetAll, GetOne } from "api";
import useProfile from "hooks/useProfile";
import LoadingPage from "component/element/loading";
import Cookies from "universal-cookie";

function Login() {
  const [userDatas, setUserDatas] = useState({
    user_name: "",
    password: "",
  });
  const [check, setCheck] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setProfile } = useProfile();

  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const dataList = await GetAll("user");

    const currentData = dataList.filter((data) => {
      return userDatas?.user_name === data?.user_name;
    });

    bcrypt.compare(
      userDatas?.password,
      currentData[0]?.password,
      async (err, res) => {
        if (!res) {
          setCheck({
            pass: userDatas.password
              ? "รหัสผ่านไม่ถูกต้อง"
              : "ยังไม่ได้กรอกรหัสผ่าน",
            user_name: !userDatas.user_name && "รหัสประจำตัวไม่ถูกต้อง",
          });
          setLoading(false);
        } else {
          setCheck("");
          const userData = await GetOne("user", currentData[0]?.data_id);
          setProfile({ ...userData });

          // window.localStorage.setItem("_token_", currentData[0]?.data_id);
          const cookies = new Cookies();

          const time = new Date(new Date().getTime() + 60 * 60 * 1000);

          cookies.set("_token_", currentData[0]?.data_id, {
            path: "/",
            expires: time,
          });

          setLoading(false);
          navigate("/rehearsal");
        }
      }
    );
  };

  const onChangeText = (event) => {
    setUserDatas({ ...userDatas, [event.target.name]: event.target.value });
  };

  return (
    <>
      <StyleExtendsSection>
        <div className="login-group">
          <Contents className="login-contents" bgc="var(--blue-1)">
            <form onSubmit={onLogin}>
              <div className="login-title">
                <div>เข้าสู่ระบบ</div>
              </div>
              <Input
                title="ชื่อผู้ใช้"
                value={userDatas?.user_name}
                onChange={onChangeText}
                name="user_name"
                icon="fas fa-user"
                titleColor="#ffffff"
                margin="6px 0 0 0"
                height="36px"
                errorMsg={check?.user_name}
              />
              <div className="login-password">
                <Input
                  title="รหัสผ่าน"
                  value={userDatas?.password}
                  onChange={onChangeText}
                  name="password"
                  type={showPass ? "text" : "password"}
                  icon="fas fa-key"
                  titleColor="#ffffff"
                  height="36px"
                  errorMsg={check?.pass}
                />
                <div
                  className="show-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  <i className={`fas fa-eye ${showPass ? "open" : "close"}`} />
                </div>
              </div>

              <div className="login-link">
                <Link to="/forget-password">ลืมรหัสผ่าน</Link>
              </div>

              <Button textColor="#ffffff" bgc="var(--red-2)">
                เข้าสู่ระบบ
              </Button>
            </form>
          </Contents>

          <div className="login-recommand">
            <div className="recommand-title recommand-border">
              การเข้าใช้งานระบบ
            </div>
            <Message
              title={"นักเรียน"}
              detail={
                "เข้าสู่ระบบโดยใช้ ชื่อผู้ใช้งาน คือ รหัสประจำตัวนักเรียน"
              }
              width="140px"
              mt="6px"
              titleColor="#00446d"
              detailColor="#000000"
            />
            <Message
              title={""}
              detail={"รหัสผ่าน คือ รหัสประจำตัวประชาชนของนักเรียน"}
              width="140px"
              mt="0"
              detailColor="#000000"
            />
            <Message
              title={"บุคลากร"}
              detail={
                "เข้าสู่ระบบโดยใช้ ชื่อผู้ใช้งานของบุคลากร"
              }
              width="140px"
              mt="6px"
              titleColor="#00446d"
              detailColor="#000000"
              className="recommand-border"
            />
            <Message
              title={""}
              detail={"รหัสผ่านคือ รหัสประจำตัวประชาชนของบุคลากร"}
              width="140px"
              mt="0"
              detailColor="#000000"
            />
          </div>
        </div>
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
  );
}

export default Login;

const StyleExtendsSection = styled(Section)`
  label: login;

  display: flex;

  .login-title {
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    text-align: center;
  }

  .login-group {
    margin: 0 auto;
    width: 100%;
    font-weight: bolder;
    max-width: 500px;

    .login-recommand {
      margin: 40px auto 0 auto;

      .recommand-title {
        color: #00446d;
        font-size: 16px;
      }

      ${breakpoint("XS")} {
        margin: 20px auto 0 auto;
      }
    }

    .login-contents {
      padding: 12px 18px;
      max-width: 500px;
      margin: 40px auto 0 auto;

      ${breakpoint("XS")} {
        margin: 20px auto 0 auto;
      }
    }

    .recommand-border {
      border-top: 1px solid #00000020;
      padding-top: 16px;
      margin-top: 16px;
    }

    .login-password {
      position: relative;

      .show-pass {
        position: absolute;
        right: 10px;
        top: 29px;
        font-size: 20px;
        cursor: pointer;

        .open {
          color: #00000095;
        }

        .close {
          color: #00000040;
        }
      }
    }
  }

  .css-qh5q6h-section {
    padding: 0 10px;
  }

  .login-link {
    text-align: right;
    margin-top: 10px;
    a {
      color: #ffffff;
    }
  }

  ${breakpoint("XS")} {
    padding: 26px 20px;
  }
`;
