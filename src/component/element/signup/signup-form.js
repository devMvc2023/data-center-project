import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Group,
  Group2,
} from "component/common/page-layout/page-layout";
import { useLocation, useParams } from "react-router-dom";
import bcrypt from "bcryptjs";
import { Input, Select } from "component/common/form";
import useProfile from "hooks/useProfile";
import { PopupJs } from "component/common/popup";
import Table from "component/common/table";
import { breakpoint } from "component/common/util";
import { GetAll, GetOne } from "api";

function SignupForm({ onSignup = () => null }) {
  const [check, setCheck] = useState({});
  const [selectDetail, setSelectDetail] = useState([]);
  const [faction, setFaction] = useState();
  const [subject, setSubject] = useState();
  const [position, setPosition] = useState();
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [addData, setAddData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [titleEN, setTitleEN] = useState([]);

  const { profile, editProfile, setEditProfile, setLoading } = useProfile();

  const location = useLocation();
  const params = useParams();

  const checkData = async (event) => {
    event.preventDefault();

    const identity_id = editProfile?.identity_id?.length === 13;
    const path = location.pathname === "/signup/officer";
    let student_id = editProfile?.user_name?.length === 11;
    let user_name = [];
    // const user_check = /^[A-Za-z0-9]*$/.test(editProfile?.user_name);
    const first_name_check = /^[A-Za-z]*$/.test(editProfile?.first_name_en);
    const last_name_check = /^[A-Za-z]*$/.test(editProfile?.last_name_en);
    const email_check = /^\w+([\.-]?\w+)*@\mvc.ac.th/.test(editProfile?.email);
    const phone = editProfile?.phone?.length === 10;

    if (
      location.pathname === "/signup/officer" ||
      location.pathname === "/signup/student"
    )
      user_name = userData.some((d) => d.user_name === editProfile?.user_name);

    if (location.pathname === `/user/${editProfile?.data_id}/account/edit`)
      user_name = userData.some(
        (d) =>
          d.user_name === editProfile?.user_name &&
          d.data_id !== editProfile?.data_id
      );

    setCheck({
      phone:
        (!editProfile?.phone && "กรอกเบอร์โทรศัพท์") ||
        (!phone && "ต้องมี 0 นำหน้า และยาว 10 หลัก"),
      email:
        (!email_check && "ต้องเป็นอีเมล @mvc.ac.th เท่านั้น") ||
        (!editProfile?.email && "กรอกอีเมล"),
      faction:
        path && editProfile?.user_faction?.length === 0 && "กรุณาเพิ่มฝ่ายงาน",
      title: !editProfile?.title && "กรุณาเลือกคำนำหน้า",
      first: !editProfile?.first_name && "กรอกชื่อจริง",
      last: !editProfile?.last_name && "กรอกนามสกุล",
      first_en:
        (!editProfile?.first_name_en && "กรอก First Name") ||
        (!first_name_check && "กรุณากรอก First Name เป็นภาษาอังกฤษ"),
      last_en:
        (!editProfile?.last_name_en && "กรอก Last Name") ||
        (!last_name_check && "กรุณากรอก Last Name เป็นภาษาอังกฤษ"),
      // user_name:
      //   (!editProfile?.user_name && "กรอกข้อมูล") ||
      //   (user_name && "มีคนใช้แล้ว") ||
      //   (!path &&
      //     location.pathname !== `/user/${profile?.data_id}/account/edit` &&
      //     student_id &&
      //     editProfile?.user_name &&
      //     "รหัสนักศึกษาต้องมี 11 หลัก") ||
      //   (!user_check && "ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษและตัวเลขเท่านั้น"),
      identity_id:
        (!editProfile?.identity_id && "กรอกรหัสประจำตัว") ||
        (!identity_id && "รหัสบัตรประชาชนไม่ถูกต้อง"),
    });

    if (
      !check.faction &&
      !check.title &&
      !check.first &&
      !check.last &&
      // check.user_name &&
      !check.identity_id &&
      (location.pathname === "/signup/officer"
        ? editProfile?.user_faction?.length > 0
        : editProfile) &&
      (location.pathname === "/signup/student" ? student_id : editProfile) &&
      editProfile?.title &&
      // editProfile?.user_name &&
      editProfile?.first_name &&
      editProfile?.last_name &&
      editProfile?.first_name_en &&
      editProfile?.last_name_en &&
      editProfile?.email &&
      editProfile?.identity_id &&
      identity_id &&
      // user_check &&
      first_name_check &&
      last_name_check &&
      email_check &&
      phone
    ) {
      let hashedPass = bcrypt.hashSync(editProfile?.identity_id, 13);

      const data = {
        ...editProfile,
        password: editProfile?.password || hashedPass,
      };
      onSignup(data);
    }
  };

  const onSelectChange = (event, data, index) => {
    let dataArr = [...selectDetail];

    dataArr[index] = {
      [event.target.name]: data.filter((d) => event.target.value === d.name)[0]
        .detail,
    };

    setSelectDetail(dataArr);
  };

  const onChangeText = (event) => {
    setEditProfile({ ...editProfile, [event.target.name]: event.target.value });
  };

  const onChangeAdd = (event, index, data) => {
    let dataArr = [...addData];

    const name1 = `${event.target.name}_id`;
    const name2 = `${event.target.name}_name`;

    if (data) {
      const id = data.filter((d) => d.name === event.target.value)[0].data_id;

      dataArr[index] = {
        ...dataArr[index],
        [name1]: id || "",
        [name2]: event.target.value,
      };
    } else {
      dataArr[index] = {
        ...dataArr[index],
        [name2]: event.target.value,
      };
    }

    setAddData(dataArr);

    if (
      location.pathname === "/signup/student" ||
      (location.pathname === `/user/${profile?.data_id}/account/edit` &&
        profile?.user_faction?.every(
          (data) => data?.position_name === "นักศึกษา"
        ))
    ) {
      setEditProfile({
        ...editProfile,
        user_faction: [{ ...dataArr[0], position_name: "นักศึกษา" }],
      });
    }
  };

  const onDeleteData = (event) => {
    const notDeleteData = addData.filter((item, index) => index !== event);
    const deleteD = addData.filter((item, index) => index === event);

    const d = deleteData;

    d.push(deleteD[0]);

    setDeleteData(d);
    setAddData(notDeleteData);
  };

  const onClose = () => {
    const data = addData.filter((d) => d.position_id !== "");

    if (deleteData) {
      setAddData([...addData, ...deleteData]);
    }

    setAddData(data);
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
    if (location.pathname === "/signup/officer") {
      setAddData([...addData, { position_id: "" }]);
    }
  };

  const onSetFaction = () => {
    const data = addData.filter((d) => d.position_id);

    setEditProfile({
      ...editProfile,
      user_faction: data,
    });
    setAddData(data);

    setDeleteData([]);
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const subject = await GetAll("subject");
      const faction = await GetAll("faction");
      const position = await GetAll("position");
      const title = await GetAll("title");
      const user = await GetAll("user");
      const title_en = await GetAll("title_en");

      setUserData(user);
      setFaction(faction.sort((a, b) => a.id - b.id));
      setSubject(subject.sort((a, b) => a.id - b.id));
      setPosition(position.sort((a, b) => a.id - b.id));
      setTitle(title.sort((a, b) => a.id - b.id));
      setTitleEN(title_en.sort((a, b) => a.id - b.id));
      setEditProfile({ user_faction: [] });

      if (location.pathname === `/user/${profile?.data_id}/account/edit`) {
        setAddData(profile?.user_faction);
        setEditProfile(profile);
      }

      if (
        location.pathname === `/user/${profile?.data_id}/account/edit` &&
        profile?.user_faction?.every(
          (data) => data?.position_name === "นักศึกษา"
        )
      ) {
        setSelectDetail([
          {
            subject: subject.find(
              (value) => value.name === profile?.user_faction[0]?.subject_name
            ).detail,
          },
        ]);
      }

      if (location.pathname === "/signup/student") {
        setEditProfile({
          ...editProfile,
          user_faction: [],
        });
      }

      if (location.pathname === `/member/${editProfile?.data_id}/edit`) {
        const memberData = await GetOne("user", params?.member_id);

        setEditProfile({ user_faction: [], ...memberData });
      }

      setLoading(false);
    };

    getData();
  }, [profile]);

  return (
    <Style>
      <Group>
        <Select
          data={title}
          name="title"
          selectPlace="-เลือกคำนำหน้า-"
          title={"คำนำหน้า"}
          value={editProfile?.title}
          onChange={onChangeText}
          errorMsg={check?.title}
          width="22%"
          required
        />
        <Input
          value={editProfile?.first_name}
          title="ชื่อ"
          name="first_name"
          onChange={onChangeText}
          width="38%"
          errorMsg={check?.first}
          required
        />
        <Input
          value={editProfile?.last_name}
          title="นามสกุล"
          name="last_name"
          onChange={onChangeText}
          width="38%"
          errorMsg={check?.last}
          required
        />
      </Group>
      <Group>
        <Select
          data={titleEN}
          name="title_en"
          selectPlace="-เลือกคำนำหน้า-"
          title={"Title"}
          value={editProfile?.title_en}
          onChange={onChangeText}
          errorMsg={check?.title}
          width="22%"
          required
        />
        <Input
          value={editProfile?.first_name_en}
          title="First Name"
          name="first_name_en"
          onChange={onChangeText}
          width="38%"
          errorMsg={check?.first_en}
          required
        />
        <Input
          value={editProfile?.last_name_en}
          title="Last Name"
          name="last_name_en"
          onChange={onChangeText}
          width="38%"
          errorMsg={check?.last_en}
          required
        />
      </Group>
      {(location.pathname === "/signup/officer" ||
        (location.pathname === `/user/${profile?.data_id}/account/edit` &&
          profile?.user_faction?.every(
            (data) => data?.position_name !== "นักศึกษา"
          ))) && (
        <>
          {editProfile?.user_faction?.some((data) =>
            [
              "ครูพิเศษสอน",
              "ข้าราชการครู",
              "ผู้ช่วยหัวหน้าภาควิชา",
              "หัวหน้าภาควิชา",
              "พนักงานราชการครู",
            ].every((d) => data.position_name !== d)
          ) && (
            <Table
              th={["ตำแหน่ง", "ฝ่าย", "งาน"]}
              td={editProfile?.user_faction?.map(
                (data, index) =>
                  [
                    "ครูพิเศษสอน",
                    "ข้าราชการครู",
                    "ผู้ช่วยหัวหน้าภาควิชา",
                    "หัวหน้าภาควิชา",
                    "พนักงานราชการครู",
                  ]?.every((d) => d !== data.position_name) && (
                    <tr key={index}>
                      <td className="td-position">{data.position_name}</td>
                      <td className="td-faction">{data.faction_name}</td>
                      <td className="td-work">{data.work_name}</td>
                    </tr>
                  )
              )}
            />
          )}
          {editProfile?.user_faction?.some((data) =>
            [
              "ครูพิเศษสอน",
              "ข้าราชการครู",
              "ผู้ช่วยหัวหน้าภาควิชา",
              "หัวหน้าภาควิชา",
              "พนักงานราชการครู",
            ]?.some((d) => data.position_name === d)
          ) && (
            <Table
              th={["ตำแหน่ง", "ประเภทวิชา", "ภาควิชา"]}
              td={editProfile?.user_faction.map(
                (data, index) =>
                  [
                    "ครูพิเศษสอน",
                    "ข้าราชการครู",
                    "ผู้ช่วยหัวหน้าภาควิชา",
                    "หัวหน้าภาควิชา",
                    "พนักงานราชการครู",
                  ].some((d) => d === data.position_name) && (
                    <tr key={index}>
                      <td className="td-position">{data.position_name}</td>
                      <td className="td-faction">{data.subject_name}</td>
                      <td className="td-work">{data.department_name}</td>
                    </tr>
                  )
              )}
            />
          )}
        </>
      )}
      {(location.pathname === "/signup/officer" ||
        (location.pathname === `/user/${profile?.data_id}/account/edit` &&
          profile?.user_faction?.every(
            (data) => data?.position_name !== "นักศึกษา"
          ))) && (
        <FactionGroup>
          <Button
            className="add-faction"
            margin="0"
            bgc="rgb(26,115,232)"
            textColor="#ffffff"
            onClick={onOpen}
            height="30px"
            type="button"
          >
            {location.pathname === `/user/${profile?.data_id}/account/edit`
              ? "แก้ไขหน้าที่"
              : "เพิ่มหน้าที่"}
          </Button>
        </FactionGroup>
      )}
      {check?.faction && (
        <div className="err-message text-danger">{check?.faction}</div>
      )}
      <PopupJs.jsx
        open={open}
        onClose={onClose}
        maxWidth="1000px"
        tagButtons={
          <>
            <Button
              type="button"
              margin="0 auto 0 20px"
              bgc="var(--red-7)"
              onClick={onClose}
            >
              ยกเลิก
            </Button>
            <Button
              type="button"
              margin="0 20px 0 auto"
              bgc="#28a745"
              onClick={onSetFaction}
            >
              ตกลง
            </Button>
          </>
        }
      >
        {addData?.map((data, index) => {
          return (
            <FactionGroup key={index}>
              <div className="faction-number">{index + 1}</div>

              <Group2 className="faction-group">
                <Select
                  title={"ตำแหน่งหน้าที่"}
                  selectPlace={
                    addData[index].position_name
                      ? addData[index]?.position_name
                      : "---เลือกตำแหน่ง---"
                  }
                  data={position}
                  name={"position"}
                  align={data.position_name ? "left" : "center"}
                  width="22%"
                  onChange={(event) => onChangeAdd(event, index, position)}
                  disabled={profile?.position === "นักศึกษา"}
                  errorMsg={check?.position}
                  required
                />
                {data.position_name && data.position_name !== "ผู้อำนวยการ" && (
                  <>
                    {[
                      "ครูพิเศษสอน",
                      "ข้าราชการครู",
                      "ผู้ช่วยหัวหน้าภาควิชา",
                      "หัวหน้าภาควิชา",
                      "พนักงานราชการครู",
                    ].every((d) => d !== data.position_name) && (
                      <>
                        <Select
                          title={"ฝ่ายงาน"}
                          selectPlace={
                            data.faction_name
                              ? data?.faction_name
                              : "---เลือกฝ่ายงาน---"
                          }
                          data={faction}
                          name={"faction"}
                          align={data.faction_name ? "left" : "center"}
                          width="36%"
                          onSelectChange={(event) =>
                            onSelectChange(event, faction, index + 1)
                          }
                          onChange={(event) =>
                            onChangeAdd(event, index, faction)
                          }
                        />
                        {data?.position_name !== "รองผู้อำนวยการ" && (
                          <Select
                            title="งาน"
                            selectPlace={
                              data.work_name
                                ? data?.work_name
                                : "---เลือกงาน---"
                            }
                            data={selectDetail[index + 1]?.faction}
                            name={"work"}
                            align={data.work_name ? "left" : "center"}
                            width="36%"
                            nested={true}
                            onChange={(event) => onChangeAdd(event, index)}
                            errorMsg={check?.work}
                          />
                        )}
                      </>
                    )}

                    {[
                      "ครูพิเศษสอน",
                      "ข้าราชการครู",
                      "ผู้ช่วยหัวหน้าภาควิชา",
                      "หัวหน้าภาควิชา",
                      "พนักงานราชการครู",
                    ].some((d) => d === data.position_name) && (
                      <>
                        <Select
                          title={"ประเภทวิชา"}
                          data={subject}
                          name={"subject"}
                          selectPlace="---กรุณาเลือกประเภทภาควิชา---"
                          value={editProfile?.subject}
                          onSelectChange={(event) =>
                            onSelectChange(event, subject, 0)
                          }
                          onChange={(event) =>
                            onChangeAdd(event, index, subject)
                          }
                          errorMsg={check?.subject}
                          required={location.pathname !== "/signup/officer"}
                          width="36%"
                        />
                        <Select
                          title="ภาควิชา"
                          data={selectDetail[0]?.subject}
                          name={"department"}
                          value={editProfile?.department}
                          selectPlace="---กรุณาเลือกภาควิชา---"
                          nested={true}
                          onChange={(event) => onChangeAdd(event, index)}
                          errorMsg={check?.department}
                          required={location.pathname !== "/signup/officer"}
                          width="36%"
                        />
                      </>
                    )}
                  </>
                )}

                <Button
                  margin="38px 0 0 0"
                  width="45px"
                  padding="0"
                  height="30px"
                  type="button"
                  bgc="var(--red-7)"
                  className="delete-button"
                  onClick={() => onDeleteData(index)}
                >
                  ลบ
                </Button>
              </Group2>
            </FactionGroup>
          );
        })}

        <FactionGroup>
          <div
            className="add-faction text-success"
            onClick={() => setAddData([...addData, { position_id: "" }])}
          >
            เพิ่มหน้าที่
          </div>
        </FactionGroup>
      </PopupJs.jsx>
      {(location.pathname === "/signup/student" ||
        (location.pathname === `/user/${profile?.data_id}/account/edit` &&
          profile?.user_faction?.every(
            (data) => data?.position_name === "นักศึกษา"
          ))) && (
        <Group className="faction-group">
          <Select
            title={"ประเภทวิชา"}
            data={subject}
            name={"subject"}
            className="signup-input"
            selectPlace="---กรุณาเลือกประเภทภาควิชา---"
            value={editProfile?.user_faction[0]?.subject_name}
            onSelectChange={(event) => onSelectChange(event, subject, 0)}
            onChange={(event) => onChangeAdd(event, 0, subject)}
            errorMsg={check?.subject}
            required={location.pathname !== "/signup/officer"}
            width="49%"
          />
          <Select
            title="ภาควิชา"
            data={selectDetail[0]?.subject}
            name={"department"}
            className="signup-input"
            value={editProfile?.user_faction[0]?.department_name}
            selectPlace="---กรุณาเลือกภาควิชา---"
            nested={true}
            onChange={(event) => onChangeAdd(event, 0)}
            errorMsg={check?.department}
            required={location.pathname !== "/signup/officer"}
            width="49%"
          />
        </Group>
      )}

      <Group className="faction-group">
        <Input
          value={`${
            profile && profile?.role === "super admin"
              ? editProfile?.user_name
              : editProfile?.first_name_en && editProfile?.last_name_en
              ? `${
                  editProfile?.first_name_en.toLowerCase() +
                  editProfile?.last_name_en?.substring(0, 2).toLowerCase()
                }`
              : ""
          }`}
          title={"ชื่อผู้ใช้"}
          name="user_name"
          icon="fas fa-user"
          iconSize="17px"
          onChange={onChangeText}
          errorMsg={check?.user_name}
          disabled={profile?.role !== 'super admin'}
          required
          className="signup-input"
        />
        {/* {location.pathname === "/signup/student" && (
          <Input
            value={editProfile?.user_name}
            title={"รหัสนักศึกษา"}
            name="user_name"
            icon="fas fa-user"
            iconSize="17px"
            onChange={onChangeText}
            errorMsg={check?.user_name}
            type={"number"}
            required
            className="signup-input"
          />
        )} */}
        <Input
          value={editProfile?.identity_id}
          title="รหัสประจำตัวประชาชน"
          type={"number"}
          name="identity_id"
          icon="fas fa-id-card"
          onChange={onChangeText}
          required
          errorMsg={check?.identity_id}
          className="signup-input"
        />
      </Group>
      <Group className="faction-group">
        <Input
          value={editProfile?.phone}
          title="เบอร์โทรศัพท์"
          name="phone"
          icon="fas fa-phone"
          onChange={onChangeText}
          required
          errorMsg={check?.phone}
          className="signup-input"
          type={"number"}
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        />
        <Input
          value={editProfile?.email}
          title="อีเมล"
          name="email"
          icon="fa fa-envelope"
          onChange={onChangeText}
          errorMsg={check?.email}
          required
          pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i"
          placeholder2={"email@mvc.ac.th"}
          className="signup-input"
        />
      </Group>
      {location.pathname === `/user/${profile?.data_id}/account/edit` && (
        <Group className="faction-group">
          <Input
            value={editProfile?.line_id}
            title="ไลน์ไอดี"
            icon="fab fa-line"
            iconSize="20px"
            name="line_id"
            onChange={onChangeText}
            className="signup-input"
          />
        </Group>
      )}

      <Button width="140px" onClick={checkData} margin="15px auto 0 auto">
        {location.pathname === `/user/${profile?.data_id}/account/edit` ||
        location.pathname === `/member/${editProfile?.data_id}/edit`
          ? "บันทึกข้อมูล"
          : "ลงทะเบียน"}
      </Button>
    </Style>
  );
}

export default SignupForm;

const Style = styled.div`
  label: notify-form;

  table {
    margin: 20px 0 0 0;

    th {
      padding: 0;
      font-size: 14px;
    }

    .td-faction {
      width: 35%;
    }

    .td-work {
      width: 35%;
    }

    .td-position {
      width: 25%;
    }

    td {
      padding: 2px 4px;
      word-wrap: break-word;
      color: var(--gray-1);
    }

    button {
      margin: 0;
    }
  }

  .err-message {
    font-size: 13px;
    width: 100%;
    padding: 1px 6px;
    background-color: #ff000020;
  }

  .faction-group {
    .signup-input {
      width: 49%;
    }

    ${breakpoint("MD")} {
      flex-direction: column;

      .signup-input {
        width: 100%;
      }
    }
  }
`;

const FactionGroup = styled.div`
  label: faction-group;

  display: flex;

  .faction-number {
    margin-top: 40px;
    width: 20px;
  }

  .add-faction {
    margin-top: 14px;
    width: fit-content;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .faction-group {
    width: 100%;

    * {
      margin-right: 2px;
    }

    ${breakpoint("MD")} {
      flex-direction: column;

      * {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;
