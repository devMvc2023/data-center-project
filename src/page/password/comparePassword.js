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
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import LoadingPage from "component/element/loading";

export default function ComparePassword() {
  const [password, setPassword] = useState({ password: "" });
  const [check, setCheck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { profile, setChangePassPath } = useProfile();
  const navigate = useNavigate();

  const checkPassword = async (event) => {
    setLoading(true);
    event.preventDefault();

    const passLen = password.password.length >= 8;
    const pass_check = /^[A-Za-z0-9]*$/.test(password?.password);

    bcrypt.compare(password?.password, profile?.password, (err, res) => {
      if (!res) {
        setCheck({
          pass:
            (!res && "รหัสผ่านไม่ถูกต้อง") ||
            (!password?.password && "กรอกรหัสผ่าน") ||
            (!passLen && "รหัสผ่านต้องมากกว่าหรือเท่ากับ 8 ตัว") ||
            (!pass_check && "รหัสผ่านต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น"),
        });
      } else {
        const path = uuidv4();

        setChangePassPath(path);
        setCheck("");
        setPassword();
        navigate(`/change-password/${path}`);
      }
    });
    setLoading(false);
  };

  const onChangeText = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  return (
    <>
      <StyleExtendsSection>
        <Contents className="password-contents">
          <form onSubmit={checkPassword}>
            <div className="password-title">
              <div>ยืนยันรหัสผ่านเดิม</div>
            </div>

            <div className="login-password">
              <Input
                title="รหัสผ่าน"
                onChange={onChangeText}
                name="password"
                type={showPass ? "text" : "password"}
                icon="fas fa-key"
                margin="6px 0 20px 0"
                height="36px"
                errorMsg={check?.pass}
              />
              <div className="show-pass" onClick={() => setShowPass(!showPass)}>
                <i className={`fas fa-eye ${showPass ? "open" : "close"}`} />
              </div>
            </div>
            {/* <div className="password-link">
            <Link to="/forget-password">ลืมรหัสผ่าน</Link>
          </div> */}

            <Button textColor="#ffffff" bgc="var(--red-2)">
              ต่อไป
            </Button>
          </form>
        </Contents>
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
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

  .password-link {
    text-align: right;
    margin-top: 10px;

    a {
      color: var(--gray-1);
    }
  }

  ${breakpoint("XS")} {
    padding: 26px 20px;
  }
`;
