import styled from "@emotion/styled";
import { GetAll } from "api";
import { repairs_icon, textColor } from "array-data/repairs_icon";
import Breadcrumbs from "component/common/breadcrumbs";
import CollapseComplete from "component/common/collapse";
import { Select } from "component/common/form";
import {
  Button,
  Group2,
  Section,
} from "component/common/page-layout/page-layout";
import Pagination from "component/common/pagination";
import Table from "component/common/table";
import { breakpoint, FindData } from "component/common/util";
import LoadingPage from "component/element/loading";
import { SortData } from "component/element/rehearsal";
import EditNotify from "component/element/rehearsal/edit-notify";
import RehearsalDetail from "component/element/rehearsal/rehearsalDetail";
import UserDetail from "component/element/user/user-detail";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";

export default function User() {
  const [notifyData, setNotifyData] = useState([]);
  const [notifyWork, setNotifyWork] = useState([]);
  const [currentDataPage, setCurrentDataPage] = useState(1);
  const [currentWorkPage, setCurrentWorkPage] = useState(1);
  const [dataDetail, setDataDetail] = useState();
  const [dataDetail2, setDataDetail2] = useState();
  const [loading2, setLoading2] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterData2, setFilterData2] = useState([]);
  const [userData, setUserData] = useState(false);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [edit, setEdit] = useState(false);

  const { profile, loading, setLoading } = useProfile();

  const paginateData = (pageNumber) => setCurrentDataPage(pageNumber);
  const paginateWork = (pageNumber) => setCurrentWorkPage(pageNumber);

  const onFilter = (event) => {
    let data = [];

    if (event.target.value !== "ทั้งหมด")
      data = notifyData?.filter((d) => d.status === event.target.value);

    if (event.target.value === "ทั้งหมด") data = notifyData;

    setFilterData(data);
  };

  const onFilter2 = (event) => {
    let data = [];

    if (event.target.value !== "ทั้งหมด")
      data = notifyData?.filter((d) => d.status === event.target.value);

    if (event.target.value === "ทั้งหมด") data = notifyData;

    setFilterData2(data);
  };

  const onOpen = (data) => {
    setOpen(true);
    setDataDetail(data);
  };

  const onOpen2 = (data) => {
    setOpen2(true);
    setDataDetail2(data);
  };

  const onClose = () => {
    setOpen(false);
    setOpen2(false);
    setDataDetail(null);
    setDataDetail2(null);
  };

  const onCloseEdit = () => {
    setEdit(false);
    setDataDetail(null);
  };

  useEffect(() => {
    const getData = async () => {
      if (filterData.length === 0) setLoading2(true);
      setLoading(false);
      const res = await GetAll("notify_data");
      const user = await GetAll("user");

      res.map((data) => {
        const notify_date = new Date(data.notify_date.seconds * 1000);

        data.notify_date = notify_date.toLocaleDateString("th-TH", {
          dateStyle: "medium",
        });
        data.notify_time = notify_date.toLocaleTimeString("th-TH");

        if (data.status === "กำลังดำเนินการ" || data.status === "ปิดงาน") {
          const execution_date = new Date(data.execution_date.seconds * 1000);

          data.execution_date = execution_date.toLocaleDateString("th-TH", {
            dateStyle: "medium",
          });
          data.execution_time = execution_date.toLocaleTimeString("th-TH");
        }

        if (data.status === "ปิดงาน") {
          const finish_date = new Date(data.finish_date.seconds * 1000);

          data.finish_date = finish_date.toLocaleDateString("th-TH", {
            dateStyle: "medium",
          });
          data.finish_time = finish_date.toLocaleTimeString("th-TH");
        }
      });

      const notifyData = res.filter(
        (data) => data.user_id === profile?.data_id
      );
      const notifyWork = res.filter(
        (data) => data.contractor_id === profile?.data_id
      );

      const myNotify = SortData(notifyData);

      setNotifyData(myNotify);

      const myNotifyWork = SortData(notifyWork);

      setNotifyWork(myNotifyWork);
      setFilterData(notifyData);
      setUserData(user);
      if (filterData.length === 0) setLoading2(false);
    };

    getData();
  }, [profile, loading]);

  // get Current page
  const perPageData = 8;
  const indexOfLastData = currentDataPage * perPageData;
  const indexOfFirstData = indexOfLastData - perPageData;
  const currentData = filterData?.slice(indexOfFirstData, indexOfLastData);

  const perPageWork = 12;
  const indexOfLastWork = currentWorkPage * perPageWork;
  const indexOfFirstWork = indexOfLastWork - perPageWork;
  const currentWork = filterData2?.slice(indexOfFirstWork, indexOfLastWork);

  return (
    <>
      <StyleExtendsSection>
        {!edit ? (
          <>
            <Breadcrumbs
              className="user-breadcrumbs"
              icon="fas fa-user"
              title="บัญชีของฉัน"
            />

            <Group2 className="user-group">
              <div className="user-collapse">
                <CollapseComplete
                  classNameTitle="-title"
                  title="ข้อมูลเกี่ยวกับบัญชี"
                >
                  <UserDetail data={profile} />
                </CollapseComplete>
              </div>

              <div className="user-collapse">
                <CollapseComplete
                  classNameTitle="-title"
                  title="ข้อมูลการขอรับบริการของฉัน"
                >
                  <Select
                    width="fit-content"
                    margin="0 0 10px auto"
                    className="rehearsal-filter"
                    data={["ทั้งหมด", "รอคิว", "กำลังดำเนินการ", "ปิดงาน"]}
                    onChange={onFilter}
                  />
                  <Table
                    th={[
                      "ลำดับ",
                      "วันที่ขอรับบริการ",
                      "ผู้ดำเนินการ",
                      "สถานะ",
                      "รายละเอียด",
                    ]}
                    td={currentData?.map((data, index) => (
                      <tr
                        className={`body ${
                          data.urgent === "ด่วน" && data.status !== "ปิดงาน"
                            ? "text-info"
                            : ""
                        }
                  ${
                    data.urgent === "ด่วนมาก" && data.status !== "ปิดงาน"
                      ? "text-warning"
                      : ""
                  }
                  ${
                    data.urgent === "ด่วนมากที่สุด" && data.status !== "ปิดงาน"
                      ? "text-danger"
                      : ""
                  }`}
                        key={index}
                      >
                        <td className="text-center">
                          {currentDataPage > 1
                            ? index + 1 + indexOfFirstData
                            : index + 1}
                        </td>
                        <td className="date text-center">
                          {data.urgent === "ด่วน" && (
                            <span className="text-danger"></span>
                          )}
                          {data.notify_date}
                        </td>

                        <td className="contractor">{data.contractor}</td>
                        <td
                          className={`status text-center ${FindData(
                            data.status,
                            textColor
                          )}`}
                        >
                          {data.status}
                        </td>
                        <td className="detail">
                          <Button
                            margin="6px auto 0 auto"
                            padding="0"
                            fontSize="14px"
                            height="30px"
                            onClick={() => onOpen(data)}
                          >
                            ดูรายละเอียด
                          </Button>
                        </td>
                      </tr>
                    ))}
                  />
                  {currentData?.length === 0 && (
                    <div className="not-have">ยังไม่มีการขอรับบริการ</div>
                  )}
                  {dataDetail && (
                    <RehearsalDetail
                      userData={userData}
                      data={dataDetail}
                      open={open}
                      onClose={onClose}
                      onEdit={() => setEdit(true)}
                    />
                  )}

                  <Pagination
                    perPage={perPageData}
                    totalData={notifyData?.length}
                    paginate={paginateData}
                    page={currentDataPage}
                  />
                </CollapseComplete>
              </div>
            </Group2>
            {profile?.role !== "member" && (
              <div className={"notify-work"}>
                <CollapseComplete title="ข้อมูลงานของฉัน">
                  <Select
                    width="fit-content"
                    margin="0 0 10px auto"
                    className="rehearsal-filter"
                    data={["ทั้งหมด", "รอคิว", "กำลังดำเนินการ", "ปิดงาน"]}
                    onChange={onFilter2}
                  />
                  <Table
                    className={"my-work"}
                    th={[
                      "ลำดับ",
                      "วันที่ขอรับบริการ",
                      "ผู้ขอรับบริการ",
                      "วันที่ดำเนินการ",
                      "รายการบริการ",
                      "สถานะ",
                      "สถานะการดำเนินการ",
                      "รายละเอียด",
                    ]}
                    td={currentWork?.map((data, index) => (
                      <tr
                        className={`body ${
                          data.urgent === "ด่วน" && data.status !== "ปิดงาน"
                            ? "text-info"
                            : ""
                        }
                  ${
                    data.urgent === "ด่วนมาก" && data.status !== "ปิดงาน"
                      ? "text-warning"
                      : ""
                  }
                  ${
                    data.urgent === "ด่วนมากที่สุด" && data.status !== "ปิดงาน"
                      ? "text-danger"
                      : ""
                  }`}
                        key={index}
                      >
                        <td className="text-center">
                          {currentWorkPage > 1
                            ? index + 1 + indexOfFirstWork
                            : index + 1}
                        </td>
                        <td className="date text-center">
                          {data.urgent === "ด่วน" && (
                            <span className="text-danger"></span>
                          )}
                          {data.notify_date}
                        </td>
                        <td className="name">{data.user_name}</td>
                        <td className="text-center">{data.execution_date}</td>
                        <td className="repairs-list">
                          <i
                            className={FindData(
                              data.repairs_list,
                              repairs_icon
                            )}
                          />
                          <div>{data.repairs_list}</div>
                        </td>
                        <td className="text-center">{data.urgent}</td>
                        <td
                          className={`status text-center ${FindData(
                            data.status,
                            textColor
                          )}`}
                        >
                          {data.status}
                        </td>
                        <td className="detail">
                          <Button
                            margin="6px auto 0 auto"
                            padding="0"
                            fontSize="14px"
                            height="30px"
                            onClick={() => onOpen2(data)}
                          >
                            ดูรายละเอียด
                          </Button>
                        </td>
                      </tr>
                    ))}
                  />

                  {currentWork?.length === 0 && (
                    <div className="not-have">ยังไม่มีงาน</div>
                  )}
                  {dataDetail2 && (
                    <RehearsalDetail
                      userData={userData}
                      data={dataDetail2}
                      open={open2}
                      onClose={onClose}
                      onEdit={() => setEdit(true)}
                    />
                  )}

                  <Pagination
                    perPage={perPageWork}
                    totalData={notifyWork?.length}
                    paginate={paginateWork}
                    page={currentWorkPage}
                  />
                </CollapseComplete>
              </div>
            )}
          </>
        ) : (
          <EditNotify data={dataDetail} onCloseEdit={onCloseEdit} />
        )}
      </StyleExtendsSection>
      <LoadingPage loading={loading2 || loading} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: user;
  font-weight: 500;

  .user-breadcrumbs {
    width: 97.5%;
    margin: 0 0 20px 0;

    ${breakpoint("XL")} {
      width: 80%;
      margin: 0 auto 20px auto;
    }

    ${breakpoint("LG")} {
      width: 100%;
      margin: 0 0 20px 0;
    }
  }

  .notify-work {
    margin-right: 36px;

    ${breakpoint("XL")} {
      width: 80%;
      margin: 0 auto 20px auto;
    }

    ${breakpoint("LG")} {
      width: 96%;
      margin: 0 auto 20px auto;
    }
  }

  .repairs-list {
    i {
      text-align: center;
      width: 25px;
    }
  }

  .user-collapse {
    width: 49%;
    margin-right: 36px;

    .date {
      width: 20%;
    }

    .contractor {
      width: 40%;
    }

    .status {
      width: 20%;
    }

    .detail {
      width: 30%;
    }

    ${breakpoint("XL")} {
      width: 80%;
      margin-right: 0;
    }

    ${breakpoint("LG")} {
      width: 96%;
    }
  }

  .user-group {
    ${breakpoint("XL")} {
      align-items: center;
      flex-direction: column;
    }
  }

  .not-have {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    font-weight: 900;
  }

  .table-body {
    margin-bottom: 20px;

    .table {
      ${breakpoint("MD")} {
        width: 640px;
      }
    }

    .my-work {
      width: 1350px;

      ${breakpoint("MD")} {
        width: 1100px;
      }
    }
  }

  .warning {
    color: #fd7e14;
  }
`;
