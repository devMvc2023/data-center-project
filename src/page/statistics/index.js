import styled from "@emotion/styled";
import { GetAll } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { Select } from "component/common/form";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import LoadingPage from "component/element/loading";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { chartColor, month } from "array-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const [time, setTime] = useState("รายเดือน");
  const [dataInTime, setDataInTime] = useState([]);
  const [notifyData, setNotifyData] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [filter, setFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOption, setChartOption] = useState();

  const date = new Date();
  const year = date.getFullYear() + 543 - 5;
  const currentYear = date.getFullYear() + 543;

  const onChartData = (dataInti, path, timely) => {
    const dataSets = [];
    const labels = [];

    if (timely === "รายปี") {
      dataInti.map((data) => {
        labels.push(data.time);
        dataSets.push(
          data.data.filter((p) =>
            path !== "ทั้งหมด" ? p.repairs_list === path : p
          ).length
        );
      });
    }

    if (timely === "รายเดือน") {
      dataInti.map((data) => {
        labels.push(month[data.time - 1]);
        dataSets.push(
          data.data.filter((p) =>
            path !== "ทั้งหมด" ? p.repairs_list === path : p
          ).length
        );
      });
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "จำนวนงาน",
          data: dataSets,
          backgroundColor: chartColor,
        },
      ],
    });

    setChartOption({
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: `${timely} (ปี ${currentYear})`,
          },
        },
      },
    });
  };

  const onTimely = (time, dataT, path) => {
    let dataTime = [];

    if (time === "รายปี") {
      const filData = dataT.filter((data) => data.notify_year > year);

      for (let i = 0; i < 5; i++) {
        const timeData = filData.filter(
          (data) => data?.notify_year == currentYear - i
        );

        if (timeData[0]?.notify_year !== undefined) {
          dataTime.push({ time: timeData[0]?.notify_year, data: timeData });
        }
      }
    }

    if (time === "รายเดือน") {
      for (let i = 1; i < 13; i++) {
        const timeData = dataT.filter((data) => data?.notify_month == i);

        dataTime.push({ time: i, data: timeData });
      }
    }

    onChartData(dataTime, path, time);

    setTime(time);
    setDataInTime(dataTime);
  };

  const onFilter = (event) => {
    setFilter(event.target.value);
    onChartData(dataInTime, event.target.value, time);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const data = await GetAll("notify_data");
      const repairs_list = await GetAll("repairs_list");

      //get date
      data.map((data) => {
        const date = new Date(data.notify_date.seconds * 1000);

        data.notify_year = date.getFullYear() + 543;
        data.notify_month = date.getMonth() + 1;
      });

      setNotifyData(data);
      setRepairs(repairs_list);
      setFilter("ทั้งหมด");
      if (data && repairs_list) onTimely("รายเดือน", data, "ทั้งหมด");
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <StyleExtendsSection>
        <div className="statistics-content">
          <div className="statistics-bar">
            <div className="bar-work-menu">
              <div className={`bar-menu`}></div>
            </div>
            <div className="bar-yearly">
              <div
                className={`bar-menu ${
                  time === "รายเดือน" ? "active" : "non-active"
                }`}
                onClick={() => onTimely("รายเดือน", notifyData, filter)}
              >
                รายเดือน
              </div>
              <div
                className={`bar-menu ${
                  time === "รายปี" ? "active" : "non-active"
                }`}
                onClick={() => onTimely("รายปี", notifyData, filter)}
              >
                รายปี
              </div>
            </div>
          </div>
          <Breadcrumbs
            icon={"fas fa-chart-bar"}
            title="สถิติการให้บริการงานศูนย์ข้อมูลสารสนเทศ"
          />

          <Contents className="statistics-table-chart">
            <Select
              width="fit-content"
              margin="0 0 10px auto"
              data={["ทั้งหมด", ...repairs]}
              onChange={(event) => onFilter(event)}
            />
            <table className="table">
              <thead>
                <tr>
                  <td rowSpan="2" className="table-header1 table-border">
                    {time === "รายปี" ? "ปี" : `เดือน (ปี ${currentYear})`}
                  </td>
                  <td rowSpan="2" className="table-header1 table-border">
                    รวม
                  </td>
                  <td colSpan="5" className="table-header1 table-border">
                    สถานะ
                  </td>
                </tr>
                <tr>
                  <td className="table-primary table-border">รอคิว</td>
                  <td className="table-primary table-border">กำลังดำเนินการ</td>
                  <td className="table-primary table-border">ปิดงาน</td>
                  {/* <td className="table-primary table-border">สำเร็จ</td> */}
                </tr>
              </thead>
              <tbody>
                {dataInTime.map((ydata, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <i className="fas fa-folder" />{" "}
                        {time === "รายปี"
                          ? `ปี ${ydata.time}`
                          : `เดือน ${month[ydata.time - 1]}`}
                      </td>
                      <td className="text-center">
                        {
                          ydata.data.filter((d) =>
                            filter !== "ทั้งหมด" ? d.repairs_list === filter : d
                          ).length
                        }
                      </td>
                      <td className="text-center">
                        {
                          ydata.data.filter((d) =>
                            filter !== "ทั้งหมด"
                              ? d.status === "รอคิว" &&
                                d.repairs_list === filter
                              : d.status === "รอคิว" && d
                          ).length
                        }
                      </td>
                      <td className="text-center">
                        {
                          ydata.data.filter((d) =>
                            filter !== "ทั้งหมด"
                              ? d.status === "กำลังดำเนินการ" &&
                                d.repairs_list === filter
                              : d.status === "กำลังดำเนินการ" && d
                          ).length
                        }
                      </td>
                      <td className="text-center">
                        {
                          ydata.data.filter((d) =>
                            filter !== "ทั้งหมด"
                              ? d.status === "ปิดงาน" &&
                                d.repairs_list === filter
                              : d.status === "ปิดงาน" && d
                          ).length
                        }
                      </td>
                      {/* <td className="text-center">
                        {
                          ydata.data.filter((d) =>
                            filter !== "ทั้งหมด"
                              ? d.status === "สำเร็จ" &&
                                d.repairs_list === filter
                              : d.status === "สำเร็จ" && d
                          ).length
                        }
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Contents>
          <Contents className="statistics-table-chart">
            <div className="chart-title">สถิติการให้บริการปี {currentYear}</div>
            <Bar options={chartOption} data={chartData} />
          </Contents>
        </div>
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: statistics;

  .statistics-bar {
    display: flex;
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 16px;
    justify-content: space-between;

    .bar-work-menu {
      display: flex;
    }

    .bar-yearly {
      display: flex;

      ${breakpoint("675px")} {
        display: none;
      }
    }

    .bar-menu {
      padding: 0.5rem 1rem;
      color: #007bff;
      font-size: 1.05rem;
      font-weight: 500;
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      cursor: pointer;
    }

    .non-active {
      &:hover {
        border: 1px solid #dee2e680;
      }
    }

    .active {
      border-color: #dee2e6 #dee2e6 #fff;
      color: var(--gray-1);
      margin-bottom: -1px;
    }

    ${breakpoint("MD")} {
      margin: 10px 10px 16px 10px;
    }
  }

  .statistics-content {
    max-width: 75%;
    margin: auto;

    .statistics-table-chart {
      max-width: 100%;
      padding: 1.25rem;
      font-weight: 900;
      overflow: auto;
      margin-bottom: 20px;

      ${breakpoint("MD")} {
        width: 98%;
        margin: 20px auto auto auto;
      }
    }

    .chart-title {
      text-align: center;
      font-weight: 900;
      font-size: 20px;
    }

    select {
      font-weight: 900;
    }

    .table {
      width: 100%;

      td {
        padding: 0.3rem;
      }

      .table-header1 {
        background-color: #d6d8db;
        vertical-align: middle;
        text-align: center;
      }

      .table-border {
        border: 2px solid #dee2e6;
        text-align: center;
      }

      tbody {
        background-color: #fdfdfe;
      }

      ${breakpoint(488)} {
        width: 440px;
      }
    }

    ${breakpoint("XL")} {
      max-width: 100%;
    }
  }

  .year-monthly {
    position: fixed;
    bottom: 20px;
    left: 20px;
    border: 1px solid var(--gray-1);
    border-radius: 6px;
    width: 120px;
    height: 60px;
  }
`;
