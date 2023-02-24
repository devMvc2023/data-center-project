import styled from "@emotion/styled";
import { NOTIFY_IMAGE_URL, GET, PUT, GetOne, UPDATE } from "api";
import { Input, Message2, Select } from "component/common/form";
import { Button, Group2 } from "component/common/page-layout/page-layout";
import { PopupJs } from "component/common/popup";
import { breakpoint } from "component/common/util";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingPage from "../loading";

export default function UserDetail({ data }) {
  const [preview, setPreview] = useState();
  const [role, setRole] = useState(data?.role);

  const { loading, setLoading, profile } = useProfile();

  const onUpdate = async (event, data2) => {
    setLoading(true);

    const dataAll = {
      [event.target.name]: data2,
    };
    try {
      const res = await UPDATE("user", dataAll, data.data_id);

      if (res === "update success!") {
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "log >> file: user-detail.js >> line 24 >> onUpdateRole >> error",
        error
      );
    }
  };

  return (
    <Style>
      <Group2 className="member-group">
        <Message2
          className="user-name"
          title={"ชื่อ-นามสกุล"}
          detail={`${data?.title}${data?.first_name} ${data?.last_name}`}
        />

        <Message2
          className="user-line_id"
          title={"ชื่อผู้ใช้"}
          detail={data?.user_name}
        />
        {data?.data_id === profile?.data_id && (
          <Link to={`/user/${data?.data_id}/account/edit`}>
            <Button className="edit-button" bgc="#0d6efd">
              แก้ไข
            </Button>
          </Link>
        )}
      </Group2>
      <Group2 className="member-group">
        <Message2
          className="user-phone"
          title={"เบอร์โทรศัพท์"}
          detail={data?.phone}
        />
        <Message2
          className="user-line_id"
          title={"รหัสประจำตัวประชาชน"}
          detail={data?.identity_id}
        />
      </Group2>
      {(data?.line_id || data?.line_qr) && (
        <Group2 className="member-group">
          <Message2
            className="user-line_id"
            title={"ไลน์ไอดี"}
            detail={data?.line_id || "(ไม่มีไลน์ไอดี)"}
          />
          <Message2
            className="user-line_qr"
            title={"ไลน์คิวอาร์โค้ด"}
            detail={
              data?.line_qr ? (
                <div
                  className="line_qr"
                  onClick={() => setPreview(data?.line_qr)}
                >
                  <img src={data?.line_qr} />
                </div>
              ) : (
                "(ไม่มีคิวอาร์โค้ด)"
              )
            }
          />
        </Group2>
      )}
      {preview && (
        <PopupJs.jsx
          open={preview && true}
          maxWidth="60%"
          onClose={() => setPreview(null)}
        >
          <img src={preview} />
        </PopupJs.jsx>
      )}
      {data?.user_faction &&
        data?.user_faction.map((data, index) => {
          return (
            <div key={index}>
              {data.faction_name && (
                <>
                  <Group2 className="member-group">
                    <Message2
                      className="user-position"
                      title={"ตำแหน่ง"}
                      detail={data?.position_name}
                    />
                    <Message2
                      className="user-faction"
                      title={"ฝ่ายงาน"}
                      detail={data?.faction_name}
                    />
                    <Message2
                      className="user-work"
                      title={"งาน"}
                      detail={data?.work_name}
                    />
                  </Group2>

                  {index + 1 !== data?.user_faction?.length && <hr />}
                </>
              )}
              {data.department_name && (
                <>
                  <Group2 className="member-group">
                    <Message2
                      className="user-position"
                      title={"ตำแหน่ง"}
                      detail={data?.position_name}
                    />
                    <Message2
                      className="user-faction"
                      title={"ประเภทวิชา"}
                      detail={data?.subject_name}
                    />
                    <Message2
                      className="user-work"
                      title={"ภาควิชา"}
                      detail={data?.department_name}
                    />
                  </Group2>

                  {index + 1 !== data?.user_faction?.length && <hr />}
                </>
              )}
            </div>
          );
        })}
      {data?.department && (
        <Group2 className="member-group">
          <Message2
            className="user-subject"
            title={"ประเภทวิชา"}
            detail={data?.subject}
          />
          <Message2
            className="user-department"
            title={"ภาควิชา"}
            detail={data?.department}
          />
        </Group2>
      )}
      <Group2 className="member-group">
        {profile?.role === "super admin" ? (
          <div className="d-flex user-role">
            <Select
              title={"สถานะ"}
              data={["member", "staff", "admin", "super admin"]}
              name={"role"}
              value={role || profile?.role}
              width="160px"
              margin="0"
              onChange={(event) => setRole(event.target.value)}
              required
            />
            <Button
              type="button"
              margin="20px 0 0 10px"
              width="100px"
              height="30px"
              name="role"
              onClick={(event) => onUpdate(event, role)}
              disabled={!role || role === data?.role}
            >
              เปลี่ยนสถานะ
            </Button>
          </div>
        ) : (
          <Message2 className="user-role" title={"สถานะ"} detail={data?.role} />
        )}
        {data?.data_id !== profile?.data_id &&
          profile?.role === "super admin" &&
          data?.role !== "member" && (
            <Input
              className="user-department"
              style={"4"}
              type="checkbox"
              margin="20px 0 0 0"
              name="allow_work"
              title={"อนุญาตให้ทำงานแทน"}
              defaultChecked={data?.allow_work}
              onChange={(event) => {
                onUpdate(event, event.target.checked);
              }}
            />
          )}
        {profile?.data_id === data?.data_id && (
          <Link to="/change-password" className="change-password">
            เปลี่ยนรหัสผ่าน
          </Link>
        )}
      </Group2>
    </Style>
  );
}

const Style = styled.div`
  label: user-detail;
  font-weight: 900;

  .edit-button {
    position: absolute;
    right: 20px;
    top: -10px;
    padding: 0.2rem;
    width: 60px;
    height: 30px;

    a {
      text-decoration: none;
      color: #ffffff;
    }
  }

  .user-name {
    flex: 0 0 50%;
  }

  .user-email {
    flex: 0 0 40%;
  }

  .user-phone {
    flex: 0 0 50%;
  }

  .user-line_id {
    flex: 0 0 50%;
    margin-bottom: 0;
  }

  .user-line_qr {
    flex: 0 0 50%;
    margin-bottom: 0;
    .line_qr {
      width: 6rem;
      height: 6rem;
      cursor: pointer;

      img {
        object-fit: cover;
      }
    }
  }

  .user-faction {
    flex: 0 0 50%;
  }

  .user-work {
    flex: 0 0 50%;
  }

  .user-subject {
    flex: 0 0 50%;
  }

  .user-department {
    flex: 0 0 50%;
  }

  .user-position {
    flex: 0 0 50%;
  }

  .user-role {
    flex: 0 0 50%;
  }

  .user-student_id {
    flex: 0 0 50%;
  }

  .member-group {
    position: relative;
    flex-wrap: wrap;

    ${breakpoint("XS")} {
      flex-wrap: wrap;
    }
  }

  .change-password {
    margin: 20px 0 0 0;
  }

  hr {
    margin: 0 0 0.5rem 0;
  }
`;
