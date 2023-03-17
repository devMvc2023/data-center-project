import { DELETE, GetAll, UPDATE } from "api";
import { Button, Group2 } from "component/common/page-layout/page-layout";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";
import { FindData, storage } from "component/common/util";
import { PopupJs } from "component/common/popup";
import { repairs_icon } from "array-data/repairs_icon";
import styled from "@emotion/styled";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NotifyReport from "../notify-report";
import { Input, Select } from "component/common/form";
import LoadingPage from "../loading";
import emailjs from "@emailjs/browser";
import { deleteObject, ref } from "firebase/storage";

export default function RehearsalDetail({
  data,
  userData,
  open,
  onEdit = () => null,
  onClose = () => null,
}) {
  const [dataDetail, setDataDetail] = useState(data);
  const [currentUser, setCurrentUser] = useState();
  const [currentCon, setCurrentCon] = useState();
  const [allUser, setAllUser] = useState();
  const [preview, setPreview] = useState();
  const [rating, setRating] = useState({ open: false });
  const [urgent, setUrgent] = useState();
  const [contractor, setContractor] = useState(data?.contractor);
  const [confilm, setConfilm] = useState({
    open: false,
  });

  const { profile, loading, setLoading } = useProfile();

  const star = [1, 2, 3, 4, 5];

  const onClosePopup = () => {
    setDataDetail(null);
    setCurrentUser(null);

    onClose();
  };

  const onChangeText = (event) => {
    setDataDetail({ ...dataDetail, [event.target.name]: event.target.value });
  };

  const onUpdateData = async (status) => {
    setLoading(true);

    const date = new Date();
    let dataUpdata = {};

    if (
      dataDetail.status === "รอคิว" &&
      status !== "ไม่อนุญาต" &&
      status !== "อนุญาต"
    )
      dataUpdata = {
        status: "กำลังดำเนินการ",
        contractor: `${profile.title}${profile.first_name} ${profile.last_name}`,
        contractor_id: profile.data_id,
        execution_date: date,
      };

    if (
      dataDetail.status === "กำลังดำเนินการ" &&
      status !== "ไม่อนุญาต" &&
      status !== "อนุญาต"
    )
      dataUpdata = {
        status: status,
        finish_date: date,
        finish_note: dataDetail.finish_note || "",
      };

    if (status === "ไม่อนุญาต" || status === "อนุญาต")
      dataUpdata = {
        status: status,
        contractor: `${profile.title}${profile.first_name} ${profile.last_name}`,
        contractor_id: profile.data_id,
        execution_date: date,
        finish_date: date,
        finish_note: dataDetail.finish_note || "",
      };

    const message = {
      title: "การขอรับบริการงานศูนย์ข้อมูลสารสนเทศ",
      subTitle: "รายละเอียดการขอรับบริการของคุณ",
      contractor:
        dataDetail?.contractor ||
        `${profile.title}${profile.first_name} ${profile.last_name}`,
      phone: currentCon?.phone,
      status: status,
      user_email: currentUser?.email,
    };

    try {
      const res = await UPDATE("notify_data", dataUpdata, dataDetail.data_id);
      emailjs
        .send(
          "service_5sy3iwq",
          "template_009jvoe",
          message,
          "k6GJNXlcf6z8Qb_VG"
        )
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error.text);
          }
        );

      if (res === "update success!") {
        onClosePopup();
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "log >> file: index.js >> line 64 >> onUpdateData >> error",
        error
      );
    }
  };

  const onRating = async () => {
    setLoading(true);

    const data = {
      rating: rating?.rating,
      rating_comment: dataDetail?.rating_comment || "",
    };

    try {
      const res = await UPDATE("notify_data", data, dataDetail.data_id);

      if (res === "update success!") {
        onClosePopup();
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "log >> file: rehearsalDetail.js:87 >> onRating >> error",
        error
      );
    }
  };

  const onDeleteData = async () => {
    setLoading(true);

    try {
      const res = await DELETE("notify_data", dataDetail?.data_id);

      if (dataDetail?.images > 0) {
        dataDetail?.images?.map((image) => {
          const imageRef = ref(storage, `notify_images/${image}`);

          deleteObject(imageRef);
        });
      }

      if (res === "delete success!") {
        setLoading(true);
        setConfilm({ open: false });
        onClose();
      }
    } catch (error) {
      console.log(
        "log >> file: rehearsalDetail.js:135 >> onDelete >> error:",
        error
      );
    }
  };

  const onUpdateRole = async () => {
    setLoading(true);

    const urgentData = {
      urgent: urgent,
    };

    try {
      const res = await UPDATE("notify_data", urgentData, dataDetail.data_id);

      if (res === "update success!") {
        onClosePopup();
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "log >> file: user-detail.js >> line 24 >> onUpdateRole >> error",
        error
      );
    }
  };

  const onUpdateContractor = async () => {
    setLoading(true);

    let contractorData = {};

    allUser.map((data) => {
      if (
        `${data?.title}${data?.first_name} ${data?.last_name}` === contractor
      ) {
        contractorData = {
          contractor: contractor,
          contractor_id: data.data_id,
        };
      }
    });

    const message = {
      title: "คุณได้รับงานจากระบบการให้บริการงานศูนย์ข้อมูลสารสนเทศ",
      subTitle: "รายละเอียดงาน",
      contractor: contractor,
      phone: currentCon?.phone,
      status: dataDetail?.status,
      user_email: currentUser?.email,
    };

    try {
      const res = await UPDATE(
        "notify_data",
        contractorData,
        dataDetail.data_id
      );
      emailjs
        .send(
          "service_5sy3iwq",
          "template_009jvoe",
          message,
          "k6GJNXlcf6z8Qb_VG"
        )
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error.text);
          }
        );

      if (res === "update success!") {
        onClosePopup();
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "log >> file: user-detail.js >> line 24 >> onUpdateRole >> error",
        error
      );
    }
  };

  useEffect(() => {
    const getUserData = async (data) => {
      const currentUser = userData.filter((d) => d.data_id === data.user_id);
      const currentCon = userData.filter((d) => d.data_id === data.user_id);

      const user = [];

      userData.map((data) => {
        if (
          (profile?.role === "super admin" || profile?.role === "admin") &&
          data.role !== "super admin" &&
          data.role !== "member"
        )
          user.push(data);

        if (profile?.role === "staff") user.push(data);
      });

      setCurrentUser(currentUser[0]);
      setCurrentCon(currentCon[0]);
      setAllUser(user);
    };

    if (data) getUserData(data);
  }, [data]);

  return (
    <>
      <PopupJs.jsx
        title={
          <>
            <i className="fas fa-tools" />
            รายละเอียดการขอบริการ
          </>
        }
        tagButtons={
          <>
            <Button
              type="button"
              margin="0 10px 0 auto"
              width="60px"
              bgc="var(--gray-1)"
              onClick={onClose}
            >
              ปิด
            </Button>
            {profile?.data_id && (
              <>
                {profile?.data_id !== dataDetail?.user_id &&
                  (profile?.role === "super admin" || profile?.allow_work) && (
                    <Button
                      type="button"
                      margin="0 10px 0 0"
                      width="60px"
                      bgc="#ff0000"
                      onClick={() =>
                        setConfilm({
                          open: true,
                        })
                      }
                    >
                      ลบ
                    </Button>
                  )}
                {dataDetail?.status === "รอคิว" && (
                  <>
                    {profile?.data_id === dataDetail?.user_id && (
                      <div className="d-flex">
                        <Button
                          type="button"
                          margin="0 10px 0 0"
                          width="60px"
                          bgc="#ff0000"
                          onClick={() =>
                            setConfilm({
                              open: true,
                            })
                          }
                        >
                          ลบ
                        </Button>
                        <Button
                          type="button"
                          margin="0 0 0 0"
                          width="60px"
                          bgc="#0d6efd"
                          onClick={onEdit}
                        >
                          แก้ไข
                        </Button>
                      </div>
                    )}
                    {dataDetail?.repairs_list !== "ประชาสัมพันธ์ข่าวสาร" &&
                      profile?.role !== "member" && (
                        <Button
                          type="button"
                          onClick={() => onUpdateData("กำลังดำเนินการ")}
                          margin="0 0 0 10px"
                          bgc="var(--green-1)"
                          width="4rem"
                        >
                          รับงาน
                        </Button>
                      )}
                    {dataDetail?.repairs_list === "ประชาสัมพันธ์ข่าวสาร" &&
                      profile?.role !== "member" && (
                        <>
                          <Button
                            type="button"
                            onClick={() => onUpdateData("ไม่อนุญาต")}
                            margin="0 0 0 10px"
                            bgc="var(--red-1)"
                            width="6rem"
                          >
                            ไม่อนุญาต
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onUpdateData("อนุญาต")}
                            margin="0 0 0 10px"
                            bgc="var(--green-1)"
                            width="4rem"
                          >
                            อนุญาต
                          </Button>
                        </>
                      )}
                  </>
                )}

                {(dataDetail?.status === "กำลังดำเนินการ" ||
                  dataDetail?.status === "รออะไหล่") &&
                  profile?.role !== "member" && (
                    <>
                      {/* <Button
                    type="button"
                    onClick={() => onUpdateData("ไม่สำเร็จ")}
                    margin="0 0 0 0"
                    bgc="var(--red-7)"
                  >
                    ไม่สำเร็จ
                  </Button> */}

                      <Button
                        type="button"
                        onClick={() => onUpdateData("ปิดงาน")}
                        margin="0 0 0 0"
                        bgc="var(--green-6)"
                        width="5rem"
                      >
                        ปิดงาน
                      </Button>
                    </>
                  )}

                {(dataDetail?.status === "ปิดงาน" ||
                  dataDetail?.status === "อนุญาต" ||
                  dataDetail?.status === "ไม่อนุญาต") && (
                  <div className="d-flex">
                    {(profile?.data_id === dataDetail?.user_id ||
                      profile?.role !== "member") && (
                      <>
                        <CustomButton
                          type="button"
                          bgc="var(--red-2)"
                          width={"11rem"}
                          className="custom-button"
                          margin="0 10px 0 0"
                        >
                          <PDFDownloadLink
                            document={<NotifyReport notifyData={dataDetail} />}
                            fileName={`รายงานการปฏิบัติงาน-${dataDetail.data_id}`}
                          >
                            {({ blob, url, loading, error }) =>
                              loading ? (
                                <>
                                  <i className="fas fa-tools mx-1"></i>{" "}
                                  กำลังโหลดไฟล์
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-tools mx-1"></i>{" "}
                                  พิมพ์ใบการปฎิบัติงาน
                                </>
                              )
                            }
                          </PDFDownloadLink>
                        </CustomButton>
                      </>
                    )}

                    {profile?.data_id === dataDetail.user_id && (
                      <Button
                        type="button"
                        bgc="var(--red-7)"
                        width={"6rem"}
                        onClick={() => setRating({ open: true })}
                        margin="0 auto 0 0"
                      >
                        ให้คะแนน
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        }
        open={open}
        maxWidth="800px"
        onClose={onClosePopup}
        className="rehearsal-popup"
      >
        <LoadingPage loading={loading} />

        <div className="table-responsive">
          <div className="body-title bg-primary">ข้อมูลการขอรับบริการ</div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>ผู้ขอรับบริการ</th>
                <td>
                  {dataDetail?.user_name} : โทร {currentUser?.phone}
                </td>
              </tr>

              <tr>
                <th>รายการบริการ</th>
                <td className="overflow-auto">
                  <div className="d-flex align-items-center">
                    <i
                      className={FindData(
                        dataDetail?.repairs_list,
                        repairs_icon
                      )}
                    />
                    <span className="mx-1">{dataDetail?.repairs_list}</span>
                  </div>
                  <div>
                    {dataDetail?.symptom?.map((data, index) => {
                      return (
                        <span key={index}>
                          {index === 0 ? "" : ","} {data}
                        </span>
                      );
                    })}
                  </div>
                  {dataDetail?.notify_type}{" "}
                  {dataDetail?.note && (
                    <>
                      <u>รายละเอียดเพิ่มเติม</u>
                      <div className={`note`}>{dataDetail?.note}</div>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <th>วันที่ขอรับบริการ</th>
                <td>
                  {dataDetail?.notify_date} เวลา {dataDetail?.notify_time} น.
                </td>
              </tr>

              <tr>
                <th>หน่วยงาน</th>
                <td>
                  {dataDetail?.where_detail && (
                    <>
                      {dataDetail?.where_detail}
                      <br />
                      {dataDetail.location}
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <th>รูปภาพ</th>
                <td>
                  <div className="preview-image-group">
                    {dataDetail?.images?.length > 0
                      ? dataDetail?.images?.map((image, index) => {
                          return (
                            <div
                              key={index}
                              className="preview-image"
                              onClick={() =>
                                setPreview(
                                  `https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${image}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`
                                )
                              }
                            >
                              <img
                                src={`https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${image}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`}
                                alt="notify"
                              />
                            </div>
                          );
                        })
                      : "ไม่มีรูปภาพ"}
                  </div>
                </td>
              </tr>
              <tr>
                <th>สถานะ</th>
                <td>
                  {(profile?.role === "super admin" || profile?.allow_work) &&
                  dataDetail?.status !== "ปิดงาน" ? (
                    <div className="d-flex">
                      <Select
                        data={["ไม่ด่วน", "ด่วน", "ด่วนมาก", "ด่วนมากที่สุด"]}
                        name={"role"}
                        value={urgent || dataDetail?.urgent}
                        width="140px"
                        margin="0"
                        onChange={(event) => setUrgent(event.target.value)}
                      />
                      <Button
                        type="button"
                        margin="0 0 0 10px"
                        width="60px"
                        height="30px"
                        onClick={onUpdateRole}
                        disabled={!urgent || urgent === dataDetail?.urgent}
                      >
                        เปลี่ยน
                      </Button>
                    </div>
                  ) : (
                    dataDetail?.urgent
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="body-title bg-success">ข้อมูลการดำเนินการ</div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>วันที่ดำเนินการ</th>
                <td className="d-flex align-items-center">
                  <div>
                    {dataDetail?.execution_date
                      ? `${dataDetail?.execution_date} เวลา ${dataDetail?.execution_time} น.`
                      : "-"}
                  </div>
                </td>
              </tr>
              <tr>
                <th>ผู้ดำเนินการ</th>
                <td>
                  {(profile?.role === "super admin" || profile?.allow_work) &&
                  dataDetail?.status !== "ปิดงาน" ? (
                    <div className="d-flex">
                      <Select
                        data={allUser?.map((data) => {
                          return `${data?.title}${data?.first_name} ${data?.last_name}`;
                        })}
                        name={"role"}
                        selectPlace={
                          contractor ? contractor : "เลือกผู้ดำเนินการ"
                        }
                        width="200px"
                        margin="0"
                        onChange={(event) => setContractor(event.target.value)}
                      />

                      <Button
                        type="button"
                        margin="0 0 0 10px"
                        width="60px"
                        height="30px"
                        onClick={onUpdateContractor}
                      >
                        ตกลง
                      </Button>
                    </div>
                  ) : dataDetail?.contractor ? (
                    `${dataDetail?.contractor} : โทร ${currentCon?.phone}`
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
              <tr>
                <th>วันที่ปิดงาน</th>
                <td className="d-flex align-items-center">
                  <div>
                    {dataDetail?.finish_date
                      ? `${dataDetail?.finish_date} เวลา ${dataDetail?.finish_time} น.`
                      : "-"}
                  </div>
                </td>
              </tr>
              <tr>
                <th>สถานะการดำเนินการ</th>
                <td>
                  {dataDetail?.status === "ไม่อนุญาต" ||
                  dataDetail?.status === "อนุญาต"
                    ? `${dataDetail?.status} (ปิดงาน)`
                    : dataDetail?.status}
                </td>
              </tr>
              <tr>
                <th>สถานะการปิดงาน</th>
                <td>
                  {dataDetail?.status === "กำลังดำเนินการ" &&
                  (profile?.role !== "member") ? (
                    <>
                  <Group2>
                  <Input
                    style={"4"}
                    margin="0 20px 0 0"
                    name="finish_note"
                    value="ดำเนินการสำเร็จ"
                    title={"สำเร็จ"}
                    onChange={onChangeText}
                  />
                   <Input
                    style={"4"}
                    margin="0 20px 0 0"
                    name="finish_note"
                    value="ดำเนินการไม่สำเร็จ"
                    title={"ไม่สำเร็จ"}
                    onChange={onChangeText}
                  />
                   <Input
                    style={"4"}
                    margin="0 20px 0 0"
                    name="finish_note"
                    value="ไม่สามารถดำเนินการได้"
                    title={"ทำไม่ได้"}
                    onChange={onChangeText}
                  />
                  </Group2>
                    <textarea
                      name="finish_note"
                      value={dataDetail?.finish_note}
                      onChange={onChangeText}
                      className={`finish-note`}
                      placeholder="สถานะการปิดงาน"
                    />
                    </>
                  ) : (
                    <div className="note">{dataDetail?.finish_note || "-"}</div>
                  )}
                </td>
              </tr>
              {dataDetail?.rating > 0 && (
                <>
                  <tr>
                    <th>คะแนน</th>
                    <td className="popup-star">
                      {star.map((star, index) => {
                        return (
                          <i
                            className={`${
                              dataDetail?.rating >= star ? "fas" : "far"
                            } fa-star `}
                            key={index}
                          />
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>คำแนะนำ</th>
                    <td>{dataDetail?.rating_comment || "ไม่มีคำแนะนำ"}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </PopupJs.jsx>
      {preview && (
        <PopupJs.jsx
          open={preview && true}
          maxWidth="60%"
          onClose={() => setPreview(null)}
        >
          <img src={preview} alt="notify-preview" />
        </PopupJs.jsx>
      )}
      <PopupJs.jsx
        title={"ให้คะแนน"}
        open={rating?.open}
        maxWidth="40%"
        onClose={() => setRating({ open: false })}
        tagButtons={
          <Button
            type="button"
            onClick={onRating}
            margin="0 20px 0 auto"
            bgc="var(--red-7)"
          >
            ตกลง
          </Button>
        }
      >
        <Rating>
          <div className="star">
            {star.map((star, index) => {
              return (
                <i
                  className={`${
                    rating?.rating >= star ? "fas" : "far"
                  } fa-star `}
                  onClick={() => setRating({ ...rating, rating: star })}
                  key={index}
                />
              );
            })}
          </div>

          <textarea
            name="rating_comment"
            className={`rating-comment`}
            placeholder="ความคิดเห็น"
            onChange={onChangeText}
            value={dataDetail?.rating_comment}
          />
        </Rating>
      </PopupJs.jsx>
      {confilm.open && (
        <PopupJs.jsx
          title={<div className="text-center">ยืนยันการลบข้อมูล</div>}
          open={confilm.open && true}
          onClose={() => setConfilm({ open: false })}
          maxWidth="300px"
          tagButtons={
            <>
              <Button
                type="button"
                margin="0 auto 0 20px"
                bgc="var(--red-7)"
                onClick={() =>
                  setConfilm({
                    open: false,
                  })
                }
              >
                ยกเลิก
              </Button>
              <Button
                type="button"
                margin="0 20px 0 auto"
                bgc="#28a745"
                onClick={onDeleteData}
              >
                ยืนยัน
              </Button>
            </>
          }
        ></PopupJs.jsx>
      )}
    </>
  );
}

const Rating = styled.div`
  label: rating;

  text-align: center;
  .star {
    font-size: 26px;
    margin-bottom: 10px;
    color: rgb(212, 180, 0);
  }

  .rating-comment {
    width: 92%;
    padding: 10px;
    &:focus {
      overflow: auto;
      outline: none;
    }
  }
`;

const CustomButton = styled(Button)`
  label: link-button;

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;
