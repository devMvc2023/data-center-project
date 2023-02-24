import styled from "@emotion/styled";
import { Input } from "component/common/form";
import {
  Button,
  Contents,
  Section,
} from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import useProfile from "hooks/useProfile";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import bcrypt from "bcryptjs";
import { PUT, UPDATE } from "api";
import { PopupJs } from "component/common/popup";
import LoadingPage from "component/element/loading";

export default function ComparePassword() {
  const [password, setPassword] = useState({ password: "" });
  const [check, setCheck] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { path } = useParams();

  const { profile, editProfile, changePassPath } = useProfile();
  const navigate = useNavigate();

  const onChangePassword = async (event) => {
    setLoading(true);

    event.preventDefault();

    const pass = password?.password === password?.comfilm_pass;
    const passLen = password.password.length >= 8;
    const pass_check = /^[A-Za-z0-9]*$/.test(password?.password);

    setCheck({
      pass:
        (!passLen && "รหัสผ่านต้องมากกว่าหรือเท่ากับ 8 ตัว") ||
        (!password?.password && "กรอกรหัสผ่าน") ||
        (!pass_check && "รหัสผ่านต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น"),
      confirm: !pass && "รหัสผ่านไม่ตรงกัน",
    });

    if (!check?.pass && !check?.confirm && pass && passLen) {
      const hashedPass = bcrypt.hashSync(password?.password, 13);

      const data = {
        password: hashedPass,
      };

      try {
        if (profile?.data_id) {
          const res = await UPDATE("user", data, profile.data_id);
          if (res === "update success!") {
            navigate(`/user/${profile.data_id}/account`);
            setLoading(false);
          }
        }

        if (!profile?.data_id) {
          const res = await UPDATE("user", data, editProfile?.data_id);
          if (res === "update success!") {
            setOpen(true);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(
          "log >> file: changePassword.js:36 >> onChangePassword >> error",
          error
        );
      }
    } else {
      setLoading(false);
    }
  };

  const onChangeText = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const onClose = () => {
    setOpen(false);
    navigate("/login");
  };

  if (path === changePassPath) {
    return (
      <>
        <StyleExtendsSection>
          <Contents className="password-contents">
            <form onSubmit={onChangePassword}>
              <div className="password-title">
                <div>เปลี่ยนรหัสผ่าน</div>
              </div>

              <div className="login-password">
                <Input
                  title="รหัสผ่าน"
                  onChange={onChangeText}
                  name="password"
                  type={showPass ? "text" : "password"}
                  icon="fas fa-key"
                  margin="6px 0 0 0"
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
              <div className="login-password">
                <Input
                  title="ยืนยันรหัสผ่าน"
                  onChange={onChangeText}
                  type={showPass ? "text" : "password"}
                  name="comfilm_pass"
                  icon="fas fa-key"
                  margin="6px 0 20px 0"
                  height="36px"
                  errorMsg={check?.confirm}
                />
                <div
                  className="show-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  <i className={`fas fa-eye ${showPass ? "open" : "close"}`} />
                </div>
              </div>
              <Button textColor="#ffffff" bgc="var(--red-2)">
                ต่อไป
              </Button>
            </form>
          </Contents>
          <PopupJs.jsx
            title={"เปลี่ยนรหัสผ่านเรียบร้อย"}
            open={open}
            onClose={onClose}
          ></PopupJs.jsx>
        </StyleExtendsSection>
        <LoadingPage loading={loading} />
      </>
    );
  }

  return (
    <StyleExtendsSection>
      <Contents className="password-contents">
        <div className="password-title">
          <Link to="/change-password">กรุณาลองใหม่อีกครั้ง</Link>
        </div>
      </Contents>
    </StyleExtendsSection>
  );
}

const StyleExtendsSection = styled(Section)`
  label: password;

  display: flex;

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

  .password-title {
    align-items: center;
    font-size: 20px;
    font-weight: 800;

    text-align: center;
  }

  .password-contents {
    padding: 20px 26px;
    max-width: 500px;

    ${breakpoint("XS")} {
      padding: 20px 16px;
    }
  }

  ${breakpoint("XS")} {
    padding: 26px 20px;
  }
`;
