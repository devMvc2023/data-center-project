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
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { GetWhere } from "api";
import LoadingPage from "component/element/loading";

export default function OTPpassword() {
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const [check, setCheck] = useState([]);
  const [loading, setLoading] = useState(false);

  const { profile, setChangePassPath, setEditProfile } = useProfile();
  const navigate = useNavigate();

  const checkPassword = async (event) => {
    setLoading(true);

    event.preventDefault();

    const OTP = Number(password?.password) === otp;

    setCheck({
      pass:
        (!password?.password && "กรอกรหัส OTP") || (!OTP && "รหัสไม่ถูกต้อง"),
      email: !password.email && "กรอกอีเมล",
    });

    if (!check?.pass && OTP) {
      const path = uuidv4();

      setChangePassPath(path);

      const userData = await GetWhere("user", "email", password.email);

      setEditProfile(userData[0]);
      setLoading(false);

      navigate(`/change-password/${path}`);
    } else {
      setLoading(false);
    }
  };

  const onSendATP = async () => {
    setLoading(true);
    const OTP = Math.floor(1000 + Math.random() * 900000);

    const email_message = {
      email: password.email || profile.email,
      otp: OTP,
    };

    setOtp(OTP);

    emailjs
      .send(
        "service_ubpy3m4",
        "template_yawd2hy",
        email_message,
        "LXXEqL7ARI5DX2cXO"
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
              <div>ยืนยันรหัส OTP</div>
            </div>
            {!profile?.email && (
              <Input
                value={password?.email}
                title="อีเมล"
                name="email"
                icon="fab fa-envelope"
                width="100%"
                onChange={onChangeText}
                errorMsg={check?.email}
                required
                pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i"
                placeholder={"กรุณากรอกอีเมลเพื่อรับรหัส OTP"}
              />
            )}
            <Input
              title="รหัส OTP"
              value={otp}
              onChange={onChangeText}
              name="password"
              icon="fas fa-key"
              margin="6px 0 0 0"
              height="36px"
              type={"number"}
              errorMsg={check?.pass}
            />

            <div className="password-link">
              <Link onClick={onSendATP}>รับรหัส OTP</Link>
            </div>
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
