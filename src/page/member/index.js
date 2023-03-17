import styled from "@emotion/styled";
import { DELETE, GetAll, UPDATE } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { Input } from "component/common/form";
import {
  Button,
  Contents,
  Section,
} from "component/common/page-layout/page-layout";
import Pagination from "component/common/pagination";
import { PopupJs } from "component/common/popup";
import Table from "component/common/table";
import { breakpoint } from "component/common/util";
import LoadingPage from "component/element/loading";
import UserDetail from "component/element/user/user-detail";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

export default function Member() {
  const [userData, setUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetail, setDataDetail] = useState();
  const [dataDetail2, setDataDetail2] = useState();
  const [confilmPass, setConfilmPass] = useState({
    pass: "",
    conPass: "",
  });
  const [loading2, setLoading2] = useState(false);
  const [confilm, setConfilm] = useState({
    open: false,
    id: "",
    loading: false,
  });
  const [check, setCheck] = useState({});

  const navigate = useNavigate()

  const { profile, loading, setLoading,setEditProfile } = useProfile();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onUpdateUser = async () => {
    let pass = true;
    let conPass = true;
    let hashedPass = "";

      pass = confilmPass?.pass.length >= 8;
      conPass = confilmPass?.pass === confilmPass.conPass;
      hashedPass = bcrypt.hashSync(confilmPass?.pass, 13);
    

    setCheck({
      pass: !pass && "รหัสผ่านต้องมีมากกว่าหรือเท่ากับ 8 ตัว",
      conPass: !conPass && "รหัสผ่านไม่ตรงกัน",
    });

    if (
      !check?.pass &&
      !check?.conPass &&
      pass &&
      conPass
    ) {
      const data = {
        ...dataDetail2,
        password: hashedPass || dataDetail2?.password,
      };

      try {
        setLoading(true);

        const res = await UPDATE("user", data, dataDetail2?.data_id);

        if (res === "update success!") {
          setConfilm({ open: false, id: "", loading: false });
          setDataDetail2(null);
          setLoading(false);
        }
      } catch (error) {
        console.log("log >> file: index.js:84 >> onUpdateUser >> error", error);
      }
    }
  };

  const onEditMember=()=>{
    setEditProfile(dataDetail2)
    navigate(`/member/${dataDetail2?.data_id}/edit`)
  }

  const onEditUser = (data) => {
    setDataDetail2(data);
    setConfilmPass({ ...confilmPass, user_name: data.user_name });
  };

  const onDeleteUser = async () => {
    setLoading2(true);

    const res = await DELETE("user", confilm.id);

    if (res === "delete success!") {
      setConfilm({ open: false, index: null, loading: true });
      setDataDetail2(null);
      setLoading2(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading2(true);

      const res = await GetAll("user");

      const currentData1 = res.filter((data) => data.role === "super admin");
      const currentData2 = res.filter((data) => data.role === "admin");
      const currentData3 = res.filter((data) => data.role === "staff");
      const currentData4 = res.filter((data) => data.role === "member");

      currentData1.push(...currentData2, ...currentData3, ...currentData4);

      setUserData(currentData1);
      setLoading2(false);
    };

    getData();
  }, [loading, confilm.loading]);

  // get Current page
  const perPage = 10;
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = userData?.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <StyleExtendsSection>
        <Breadcrumbs
          className="member-breadcrumbs"
          icon="fas fa-users"
          title="สมาชิกทั้งหมด"
        />
        <Contents className="member-contents">
          <Table
            th={[
              "ลำดับ",
              "ชื่อผู้ใช้",
              "ชื่อ-นามสกุล",
              "เบอร์โทรศัพท์",
              "สถานะ",
              "รายละเอียด",
              profile?.role === "super admin" || profile?.allow_work
                ? "อัปเดต"
                : null,
            ]}
            td={currentData?.map((data, index) => (
              <tr className="body" key={index}>
                <td className="text-center">
                  {currentPage > 1 ? index + 1 + indexOfFirst : index + 1}
                </td>
                <td >{data.user_name}</td>
                <td>{`${data.title}${data.first_name} ${data.last_name}`}</td>
                <td className="text-center">{data.phone}</td>
                <td className="text-center">{data.role}</td>
                <td className="detail">
                  <Button
                    margin="6px auto 0 auto"
                    padding="0"
                    fontSize="14px"
                    height="30px"
                    onClick={() => setDataDetail(data)}
                  >
                    ดูรายละเอียด
                  </Button>
                </td>
                {(profile?.role === "super admin" || profile?.allow_work) && (
                  <td>
                    <Button
                      padding="0"
                      fontSize="14px"
                      height="30px"
                      width="60px"
                      bgc={"#0d6efd"}
                      onClick={() => onEditUser(data)}
                    >
                      อัปเดต
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          />
          {dataDetail && (
            <>
              <PopupJs.jsx
                title={
                  <>
                    <i className="fas fa-user" />
                    รายละเอียดสมาชิก
                  </>
                }
                open={dataDetail && true}
                maxWidth="660px"
                onClose={() => setDataDetail(null)}
                className="rehearsal-popup"
              >
                <UserDetail data={dataDetail} />
                <LoadingPage loading={loading} />
              </PopupJs.jsx>
            </>
          )}
          {dataDetail2 && (
            <>
              <PopupJs.jsx
                title={`${dataDetail2?.title}${dataDetail2?.first_name} ${dataDetail2?.last_name}`}
                open={dataDetail2 && true}
                maxWidth="600px"
                onClose={() => setDataDetail2(null)}
                className="rehearsal-popup"
                tagButtons={
                  <EditButton>
                    <Button
                      fontSize="16px"
                      width={"100px"}
                      height="30px"
                      margin="0 auto 0 0"
                      onClick={() =>
                        setConfilm({ open: true, id: dataDetail2?.data_id })
                      }
                    >
                      ลบสมาชิก
                    </Button>
                    <Button
                      fontSize="16px"
                      height="30px"
                      width="140px"
                      bgc={"#0d6efd"}
                      margin="0 10px 0 0"
                      onClick={onUpdateUser}
                      disabled={
                        !confilmPass?.pass &&
                        !confilmPass?.conPass
                      }
                    >
                      เปลี่ยนรหัสผ่าน
                    </Button>
                    <Button
                      fontSize="16px"
                      height="30px"
                      width="100px"
                      bgc={"orange"}
                      margin="0 0 0 0"
                      onClick={onEditMember}
                     
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </EditButton>
                }
              >
                <Input
                  value={confilmPass?.pass}
                  onChange={(event) =>
                    setConfilmPass({
                      ...confilmPass,
                      pass: event.target.value,
                    })
                  }
                  margin='0'
                  title={"รหัสผ่าน"}
                  name="user_name"
                  icon="fas fa-key"
                  iconSize="17px"
                  errorMsg={check?.pass}
                />
                <Input
                  value={confilmPass?.conPass}
                  onChange={(event) =>
                    setConfilmPass({
                      ...confilmPass,
                      conPass: event.target.value,
                    })
                  }
                  title={"ยืนยันรหัสผ่าน"}
                  name="user_name"
                  icon="fas fa-key"
                  iconSize="17px"
                  errorMsg={check?.conPass}
                />
                <LoadingPage loading={loading} />
              </PopupJs.jsx>
            </>
          )}
          <Pagination
            perPage={perPage}
            totalData={userData?.length}
            paginate={paginate}
            page={currentPage}
          />
        </Contents>
        {confilm.open && (
          <PopupJs.jsx
            title={<div className="text-center">ยืนยันการลบข้อมูล</div>}
            open={confilm.open && true}
            onClose={() => setConfilm({ open: false, id: "" })}
            maxWidth="300px"
            tagButtons={
              <>
                <Button
                  type="button"
                  margin="0 auto 0 20px"
                  bgc="var(--red-7)"
                  onClick={() => setConfilm({ open: false, id: "" })}
                >
                  ยกเลิก
                </Button>
                <Button
                  type="button"
                  margin="0 20px 0 auto"
                  bgc="#28a745"
                  onClick={onDeleteUser}
                >
                  ตกลง
                </Button>
              </>
            }
          ></PopupJs.jsx>
        )}
      </StyleExtendsSection>
      <LoadingPage loading={loading2} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: rehersal;

  .member-breadcrumbs {
    max-width: 1000px;
  }

  .member-contents {
    padding: 20px;
    max-width: 1000px;
    min-height: 560px;
    overflow: auto;

    .table-body {
      min-height: 480px;

      .table {
        height: 100%;
        ${breakpoint("LG")} {
          width: 850px;
        }
      }
    }
  }
`;

const EditButton = styled.div`
  label: edit-button;

  display: flex;
  justify-content: right;
  width: 100%;
`;
