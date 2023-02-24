import styled from "@emotion/styled";
import {
  Button,
  Contents,
  Input,
  Panel,
} from "component/common/page-layout/page-layout";
import { ProfileContext, ProfileProvider } from "context/profileProvider";
import useProfile from "hooks/useProfile";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function LoginFrom() {
  const [userDatas, setUserDatas] = useState({
    userEmail: "",
    userPassword: "",
  });
  const { profile, setProfile } = useProfile();

  const onChangeText = (event) => {
    setUserDatas({ ...userDatas, [event.target.name]: event.target.value });
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  return (
    <Style>
      {/* <div className="form-logo">
          <img src={require("../../image/school-logo.png")} />
        </div> */}
      <Contents maxWidth="500px" bgc="var(--blue-1)" padding="15px 26px">
        <Panel className="form-title" data-type="title" textColor="#ffffff">
          {/* <div className="form-title-logo">
                <img src={require("../../image/logo/school-logo.gif")} />
              </div> */}
          <div>เข้าสู่ระบบ</div>
        </Panel>

        <Input
          title="อีเมล/ชื่อผู้ใช้"
          value={userDatas?.userEmail}
          onChange={onChangeText}
          name="userEmail"
          icon="envelope"
          titleColor="#ffffff"
        />
        <Input
          title="รหัสผ่าน"
          value={userDatas?.password}
          onChange={onChangeText}
          name="userPassword"
          type="password"
          icon="key"
          titleColor="#ffffff"
        />
        <div className="link">
          <Link to="/signup">สมัครสมาชิก</Link>
        </div>
        <Button textColor="#ffffff" bgc="var(--red-2)">
          เข้าสู่ระบบ
        </Button>
      </Contents>
    </Style>
  );
}

const Style = styled.div`
  label: login-form;

  position: relative;
  display: flex;
  justify-content: center;
  /* &-logo {
      text-align: right;
      height: 250px;
      margin-right: 10px;
    } */
  &-title {
    align-items: center;

    /* &-logo {
        width: 8%;
        height: 50px;
        margin-right: 10px;
      } */
  }

  .css-qh5q6h-section {
    padding: 0 10px;
  }

  .link {
    text-align: right;
    margin-top: 10px;
    a {
      color: #ffffff;
    }
  }
`;
