import React, { useState } from "react";
import styled from "@emotion/styled";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { useLocation, useNavigate } from "react-router-dom";
import Block from "component/common/menu-block";
import teacher_image from "image/teacher.png";
import student_image from "image/student.png";
import SignupForm from "component/element/signup/signup-form";
import useProfile from "hooks/useProfile";
import { breakpoint } from "component/common/util";
import { POST } from "api";
import LoadingPage from "component/element/loading";

function Signup() {
  const [loading2, setLoading2] = useState(false);

  const { setEditProfile, loading } = useProfile();
  const location = useLocation();

  const navigate = useNavigate();

  const onSignup = async (editData) => {
    const data = {
      title: editData.title,
      first_name: editData.first_name,
      last_name: editData.last_name,
      title_en: editData.title_en,
      first_name_en: editData.first_name_en,
      last_name_en: editData.last_name_en,
      password: editData.password,
      phone: editData.phone,
      user_faction: editData?.user_faction || [],
      user_name: editData?.first_name_en.toLowerCase() + editData?.last_name_en?.substring(0, 2).toLowerCase(),
      identity_id: editData.identity_id || "",
      email: editData.email,
      role: "member",
      allow_work: false,
    };

    try {
      setLoading2(true);
      const res = await POST("user", data);

      if (res.id) {
        setLoading2(false);
        setEditProfile({ user_faction: [] });
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (location.pathname === "/signup") {
    return (
      <StyleExtendsSectionBlock>
        <Block
          title={"นักศึกษา"}
          image={student_image}
          onClick={() => navigate("/signup/student")}
        />
        <Block
          title={"บุคลากร"}
          image={teacher_image}
          onClick={() => navigate("/signup/officer")}
        />
      </StyleExtendsSectionBlock>
    );
  }
  return (
    <>
      <StyleExtendsSection>
        <Contents className="signup-content">
          <div className="signup-title">ลงทะเบียน</div>
          <form>
            <SignupForm onSignup={onSignup} />
          </form>
        </Contents>
        <div className="signup-footer">
          <div>งานศูนย์ข้อมูลสารสนเทศ วิทยาลัยอาชีวศึกษามหาสารคาม</div>
        </div>
      </StyleExtendsSection>
      <LoadingPage loading={loading2 || loading} />
    </>
  );
}

export default Signup;

const StyleExtendsSection = styled(Section)`
  label: notify-form;

  .signup-title {
    text-align: center;
    color: var(--gray-1);
    font-size: 24px;
    font-weight: 900;
  }

  button {
    margin-top: 15px;
  }

  .signup-footer {
    text-align: center;
    color: var(--gray-2);
  }

  .signup-content {
    padding: 24px;
    max-width: 800px;
    margin: 40px auto 20px auto;

    ${breakpoint("MD")} {
      margin: 0 0 20px 0;
      box-shadow: none;
    }
  }
`;

const StyleExtendsSectionBlock = styled(Section)`
  label: signup-button-page;

  display: flex;
  justify-content: center;

  ${breakpoint("LG")} {
    padding: 18px 0;
  }

  ${breakpoint("XS")} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
