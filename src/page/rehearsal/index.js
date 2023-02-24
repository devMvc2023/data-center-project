import styled from "@emotion/styled";
import { GetAll } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { Select } from "component/common/form";
import {
  Button,
  Contents,
  Section,
} from "component/common/page-layout/page-layout";
import Pagination from "component/common/pagination";
import Table from "component/common/table";
import { breakpoint, FindData } from "component/common/util";
import LoadingPage from "component/element/loading";
import { SortData, RehearsalDetail } from "component/element/rehearsal";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";
import { repairs_icon, textColor } from "../../array-data/repairs_icon";

export default function Rehersal() {
  const [notifyData, setNotifyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetail, setDataDetail] = useState();
  const [filterData, setFilterData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [userData, setUserData] = useState(false);

  const { loading } = useProfile();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onFilter = (event) => {
    let data = [];

    if (event.target.value !== "ทั้งหมด")
      data = notifyData?.filter((d) => d.status === event.target.value);

    if (event.target.value === "ทั้งหมด") data = notifyData;

    setFilterData(data);
  };

  useEffect(() => {
    const getData = async () => {
      if (filterData.length === 0) setLoading2(true);

      const notify = await GetAll("notify_data");
      const user = await GetAll("user");

      const notifyData = SortData(notify);

      notifyData.map((data) => {
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

      setNotifyData(notifyData);
      setFilterData(notifyData);
      setUserData(user);
      if (filterData.length === 0) setLoading2(false);
    };

    getData();
  }, [loading]);

  const perPage = 10;
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filterData?.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <StyleExtendsSection>
        <Breadcrumbs
          icon="fas fa-tasks"
          title="ระบบการให้บริการงานศูนย์ข้อมูลสารสนเทศ"
          className="rehearsal-breadcrumbs"
        />
        <Contents className="rehearsal-content">
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
              "ผู้ขอรับบริการ",
              "รายการบริการ",
              "ผู้ดำเนินการ",
              "สถานะ",
              "รายละเอียด",
            ]}
            td={currentData?.map((data, index) => (
              <React.Fragment key={index}>
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
                    {currentPage > 1 ? index + 1 + indexOfFirst : index + 1}
                  </td>
                  <td className="date text-center">{data.notify_date}</td>
                  <td className="name">{data.user_name}</td>
                  <td className="repairs-list">
                    <i className={FindData(data.repairs_list, repairs_icon)} />
                    <div>{data.repairs_list}</div>
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
                      onClick={() => setDataDetail(data)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          />
          {currentData?.length === 0 && (
            <div className="not-have">ยังไม่มีการขอรับบริการ</div>
          )}
          {dataDetail && (
            <RehearsalDetail
              userData={userData}
              data={dataDetail}
              onClose={() => setDataDetail(null)}
            />
          )}

          <Pagination
            perPage={perPage}
            totalData={filterData?.length}
            paginate={paginate}
            page={currentPage}
          />
        </Contents>
      </StyleExtendsSection>
      <LoadingPage loading={loading2} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: rehersal;

  .not-have {
    position: absolute;
    top: 120px;
    left: 45%;
    height: 40px;
    font-weight: 900;
  }

  .rehearsal-content {
    max-width: 1100px;
    padding: 20px;
    min-height: 560px;
    overflow: auto;

    select {
      font-weight: 900;
    }

    ${breakpoint("MD")} {
      width: 100%;
      min-height: calc(
        var(--body-height) - var(--navbar-height) - var(--breadcrumbs-height)
      );
    }
  }

  .repairs-list {
    i {
      text-align: center;
      width: 25px;
    }
  }

  .rehearsal-breadcrumbs {
    max-width: 1100px;
  }

  .table-body {
    min-height: 470px;
    .table {
      ${breakpoint(1020)} {
        width: 900px;
      }
    }
  }
`;
