import styled from "@emotion/styled";
import Breadcrumbs from "component/common/breadcrumbs";
import { FileUpload, Input, Message, Select } from "component/common/form";
import {
  Button,
  Contents,
  Group,
  Group2,
  Section,
} from "component/common/page-layout/page-layout";
import useProfile from "hooks/useProfile";
import React, { useEffect, useState } from "react";
import { GetAll, POST } from "api";
import { PopupJs } from "component/common/popup";
import { useNavigate } from "react-router-dom";
import { breakpoint, storage } from "component/common/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import LoadingPage from "component/element/loading";

export default function Notify() {
  const [notifyData, setNotifyData] = useState({
    image: [],
    urgent: "ไม่ด่วน",
  });
  const [selectDetail, setSelectDetail] = useState([]);
  const [preview, setPreview] = useState();
  const [repairs, setRepairs] = useState();
  const [check, setCheck] = useState({});
  const [symptom, setSymptom] = useState([]);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();

  const navigate = useNavigate();

  const date = new Date();

  const thDate = date.toLocaleDateString("th-TH", {
    dateStyle: "medium",
  });
  const thTime = date.toLocaleTimeString("th-TH");

  const checkData = (event) => {
    event.preventDefault();

    setCheck({
      where_notify:
        profile?.user_faction?.every(
          (data) => data?.position_name !== "นักศึกษา"
        ) &&
        !notifyData?.where_notify &&
        "เลือกงาน",
      repairs_list: !notifyData?.repairs_list && "เลือกบริการ",
      symptom: symptom.length === 0 && "เลือกสิ่งที่ต้องการ",
      urgent: !notifyData?.urgent && "เลือกความด่วน",
    });
    console.log("log >> file: index.js:29 >> Notify >> check", check);

    if (
      !check?.where_notify &&
      !check?.repairs_list &&
      !check?.symptom &&
      !check?.urgent &&
      (profile?.user_faction?.every(
        (data) => data?.position_name !== "นักศึกษา"
      )
        ? notifyData?.where_notify
        : notifyData) &&
      notifyData?.repairs_list &&
      symptom.length > 0 &&
      notifyData?.urgent
    ) {
      onNotify();
    }
  };

  const onNotify = async () => {
    setLoading(true);

    const repairs_id = repairs?.filter(
      (d) => d.name === notifyData?.repairs_list
    )[0].data_id;

    const currentSymptom = symptom.filter((sym) => sym !== undefined);

    let where = notifyData?.where_detail;
    if (notifyData?.where_notify === "ภาควิชา") {
      const department = profile?.user_faction.filter((data) =>
        [
          "ครูพิเศษสอน",
          "ข้าราชการครู",
          "ผู้ช่วยหัวหน้าภาควิชา",
          "หัวหน้าภาควิชา",
          "พนักงานราชการครู",
          "นักศึกษา",
        ].some((posi) => data.position_name === posi)
      );

      where = department[0]?.department_name;
    }

    let data = {
      user_id: profile?.data_id,
      user_name: `${profile?.title}${profile?.first_name} ${profile?.last_name}`,
      repairs_list_id: repairs_id,
      repairs_list: notifyData.repairs_list,
      symptom: currentSymptom,
      where_notify: notifyData.where_notify || "ส่วนตัว",
      where_detail: where || "ส่วนตัว",
      location: notifyData.location || "",
      note: notifyData.note || "",
      notify_date: date,
      urgent: notifyData.urgent,
      status: "รอคิว",
    };

    const urlImg = [];

    if (notifyData?.image?.length > 0) {
      notifyData?.image?.map((image) => {
        const imageRef = ref(storage, `notify_images/${image.name}`);

        uploadBytes(imageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            urlImg.push(url);

            if (urlImg.length === notifyData.image?.length) {
              data = { ...data, images: urlImg || [] };

              try {
                const res = await POST("notify_data", data);

                if (res.id) {
                  setLoading(false);
                  navigate("/rehearsal");
                }
              } catch (error) {
                console.log(
                  "log >> file: index.js >> line 31 >> onNotify >> error",
                  error
                );
              }
            }
          });
        });
      });
    }

    if (notifyData?.image?.length === 0) {
      try {
        const res = await POST("notify_data", data);

        if (res.id) {
          setLoading(false);
          navigate("/rehearsal");
        }
      } catch (error) {
        console.log(
          "log >> file: index.js >> line 31 >> onNotify >> error",
          error
        );
      }
    }
  };

  const onSelectChange = (event, data) => {
    setSymptom([]);
    setSelectDetail({
      ...selectDetail,
      [event.target.name]: data?.find(
        (value) => value.name === event.target.value
      ).detail,
    });

    if (event.target.name === "build")
      setNotifyData({ ...notifyData, floor: "" });

    if (event.target.name === "repairs_list") setSymptom([]);
  };

  const onChangeText = (event) => {
    setNotifyData({ ...notifyData, [event.target.name]: event.target.value });
  };

  const onChangeAdd = (event, index) => {
    let dataArr = [...symptom];

    if (event.target.checked) {
      dataArr[index] = event.target.value;
    }

    if (!event.target.checked) dataArr[index] = null;

    setSymptom(dataArr);
  };

  const onUpload = (event) => {
    const filesData = [...event.target.files];
    const image = [];

    filesData.map((data, index) => {
      image[index] = URL.createObjectURL(data);
    });

    setNotifyData({ ...notifyData, image: filesData });
  };

  const deleteFile = (event) => {
    const d = notifyData.image.filter((item, index) => index !== event);

    setNotifyData({ ...notifyData, image: d });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const repairs_list = await GetAll("repairs_list");

      setRepairs(repairs_list);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <StyleExtendsSection>
        <Breadcrumbs
          icon="fas fa-bell"
          title="ขอรับบริการงานศูนย์ข้อมูลสารสนเทศ"
          className="notify-breadcrumbs"
        />

        <Contents shadow="0 0 2px #00000040" className="notify-contents">
          <div className="notify-title">โปรดกรอกข้อมูลการขอรับบริการ</div>
          <form>
            <Message
              title="วันที่ขอรับบริการ"
              detail={`${thDate} เวลา ${thTime} น.`}
            />
            <Message
              title="ผู้ขอรับบริการ"
              detail={`${profile?.title}${profile?.first_name} ${profile?.last_name}`}
            />
            <Select
              title="บริการ"
              width="fit-content"
              data={repairs}
              selectWidth="220px"
              style="2"
              name="repairs_list"
              className="notify-select"
              selectPlace="--กรุณาระบุบริการ--"
              value={notifyData.repairs_list}
              onSelectChange={(event) => onSelectChange(event, repairs)}
              onChange={onChangeText}
              required
            />
            {check?.repairs_list && (
              <Group2
                className="err-margin notify-group"
                margin="6px 0 0 180px"
              >
                <div className="err-message text-danger">
                  {check?.repairs_list}
                </div>
              </Group2>
            )}

            <Group2
              className="d-flex notify-type notify-group"
              margin="15px 0 0 180px"
            >
              {selectDetail?.repairs_list?.map((data, index) => {
                return (
                  <Input
                    className="symptom"
                    style={"4"}
                    margin="0 0 0 0"
                    type={"checkbox"}
                    name="symptom"
                    value={data}
                    title={data}
                    onChange={(event) => onChangeAdd(event, index)}
                    key={index}
                    height="fit-content"
                  />
                );
              })}
            </Group2>
            {check?.symptom && (
              <Group2 className="err-margin notify-group" margin="0 0 0 180px">
                <div className="err-message text-danger">{check?.symptom}</div>
              </Group2>
            )}
            {notifyData.repairs_list === "ระบบ Internet" && (
              <Input
                className="notify-input notify-textarea"
                title="สถานที่"
                margin="20px 0 0 0"
                inputWidth="500px"
                height="34px"
                style={"3"}
                name="location"
                value={notifyData.location}
                onChange={onChangeText}
              />
            )}
            <hr />
            <Group2 className="group-image notify-group">
              <label className="image-title">ภาพประกอบ</label>

              {notifyData?.image?.length === 0 && (
                <FileUpload
                  radius="none"
                  className="file-upload"
                  icon="fas fa-image"
                  accept="image/*"
                  disabled={notifyData?.image?.length === 10}
                  onChange={onUpload}
                  plusIcon={true}
                />
              )}
              {notifyData.image?.length > 0 && (
                <div className="image-group">
                  {notifyData.image?.map((image, index) => {
                    return (
                      <div className="notify-image-group" key={index}>
                        <div
                          className="notify-image"
                          onClick={() => setPreview(URL.createObjectURL(image))}
                        >
                          <img src={URL.createObjectURL(image)} />
                        </div>
                        <div
                          className="false-icon"
                          onClick={() => deleteFile(index)}
                        >
                          <i className="fa fa-times" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Group2>
            {preview && (
              <PopupJs.jsx
                open={preview && true}
                maxWidth="60%"
                onClose={() => setPreview(null)}
              >
                <img src={preview} />
              </PopupJs.jsx>
            )}

            <Group2
              className="d-flex align-items-center notify-type notify-group"
              margin="15px 0 0 180px"
            >
              {profile?.user_faction?.some((data) => data?.work_name) && (
                <Input
                  style={"4"}
                  margin="0 20px 0 0"
                  name="where_notify"
                  value="งาน"
                  title={"งาน"}
                  onChange={onChangeText}
                />
              )}

              {profile?.user_faction?.some((data) => data?.subject_name) &&
                profile?.user_faction?.every(
                  (data) => data?.position_name !== "นักศึกษา"
                ) && (
                  <Input
                    style={"4"}
                    margin="0 20px 0 0"
                    name="where_notify"
                    value="ภาควิชา"
                    title={"ภาควิชา"}
                    onChange={onChangeText}
                  />
                )}
              {profile?.user_faction?.every(
                (data) => data?.position_name !== "นักศึกษา"
              ) && (
                <Input
                  style={"4"}
                  margin="0 0 0 0"
                  name="where_notify"
                  value="ส่วนตัว"
                  title={"ส่วนตัว"}
                  onChange={() =>
                    setNotifyData({
                      ...notifyData,
                      where_notify: "ส่วนตัว",
                      where_detail: "ส่วนตัว",
                    })
                  }
                />
              )}
            </Group2>
            {check?.where_notify && (
              <Group2 className="err-margin notify-group" margin="0 0 0 180px">
                <div className="err-message text-danger">
                  {check?.where_notify}
                </div>
              </Group2>
            )}

            <Group2
              className="d-flex align-items-center notify-type notify-group type"
              margin="0 0 0 180px"
            >
              {notifyData.where_notify === "งาน" && (
                <Select
                  className="notify-select"
                  title="งาน"
                  margin="0 20px 0 0"
                  selectPlace="--กรุณาระบุงาน--"
                  width={"fit-content"}
                  selectWidth={"240px"}
                  titleWidth="40px"
                  data={profile?.user_faction.map((data) => {
                    return data?.work_name || null;
                  })}
                  style={"2"}
                  name="where_detail"
                  value={notifyData.where_detail}
                  errorMsg={check?.where_detail}
                  onChange={onChangeText}
                  required
                />
              )}
            </Group2>
            <Input
              className="notify-input notify-textarea"
              title="รายละเอียดเพิ่มเติม"
              margin="0 0 0 0"
              inputWidth="500px"
              height="200px"
              placeholder={"อาการที่พบเจอเบื่องต้นหรือหมายเหตุเพิ่มเติม."}
              style={"3"}
              name="note"
              value={notifyData.note}
              onChange={onChangeText}
            />
            <Group2
              className="d-flex align-items-center notify-type notify-group"
              margin="15px 0 0 180px"
            >
              <Input
                style={"4"}
                margin="0 0 0 0"
                name="urgent"
                title={"ไม่ด่วน"}
                type={"radio"}
                radioClick={() =>
                  setNotifyData({ ...notifyData, urgent: "ไม่ด่วน" })
                }
                defaultChecked={true}
              />
              <Input
                style={"4"}
                margin="0 0 0 20px"
                name="urgent"
                title={"ด่วน"}
                type={"radio"}
                radioClick={() =>
                  setNotifyData({ ...notifyData, urgent: "ด่วน" })
                }
              />
            </Group2>
            {check?.urgent && (
              <Group2 className="err-margin notify-group" margin="0 0 0 180px">
                <div className="err-message text-danger">{check?.urgent}</div>
              </Group2>
            )}

            <Group className="button-group">
              <Button
                type="button"
                bgc="#dc3545"
                width="80px"
                margin="0 auto 0 0"
                onClick={() => navigate("/rehearsal")}
              >
                ยกเลิก
              </Button>
              <Button bgc="#28a745" margin="0 0 0 auto" onClick={checkData}>
                ขอรับบริการ
              </Button>
            </Group>
          </form>
        </Contents>
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: notify-form;

  .notify-breadcrumbs {
    max-width: 1000px;
  }

  .notify-contents {
    padding: 24px;
    max-width: 1000px;

    .symptom {
      width: 160px;
      margin-right: 6px;
    }
  }

  .notify-title {
    color: var(--gray-1);
    font-size: 20px;
    font-weight: 900;
  }

  hr {
    padding: 4px 0;
  }

  .button-group {
    margin-top: 26px;
    padding: 0.75rem 1.25rem;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    background-color: rgba(0, 0, 0, 0.03);
  }

  .group-image {
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;

    .notify-image-group {
      position: relative;
      display: flex;
      flex-direction: row;
      margin: 10px 10px 0 0;
      width: 106px;
      height: 106px;

      .notify-image {
        width: 100px;
        height: 100px;

        &:hover {
          cursor: zoom-in;
        }

        img {
          object-fit: cover;
        }
      }

      .false-icon {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0;
        right: 2;
        color: #ff0000;

        i {
          background-color: #ffffff;
          padding: 2px 4px;
          border: 1px solid #000000;
        }
      }
    }

    .image-group {
      display: flex;
      flex-wrap: wrap;
    }

    ${breakpoint("XS")} {
      flex-direction: column;
      margin: 20px 0 0 0;

      .file-upload {
        width: fit-content;
      }
    }
  }

  .notify-type {
    ${breakpoint("XS")} {
      margin: 20px 0 0 0;
    }
  }

  .type {
    ${breakpoint("LG")} {
      margin: 0 0 0 0;
    }
  }

  .err-margin {
    .erorr-text {
      font-size: 12px;
    }

    ${breakpoint("LG")} {
      margin: 0 0 0 0;
    }
  }

  .image-title {
    color: var(--gray-1);
    font-size: 16px;
    font-weight: 900;
    width: 180px;
  }

  .notify-room {
    ${breakpoint(1280)} {
      margin-left: 180px;
    }
  }

  .notify-select {
    ${breakpoint("XS")} {
      width: 100%;
      margin: 20px 10px 0 0;

      .style-2 {
        display: flex;
        flex-direction: column;

        .select-title {
          width: 100%;
          text-align: left;
        }

        .select {
          width: 100%;
        }
      }
    }
  }

  .notify-input {
    ${breakpoint("LG")} {
      width: 48%;
      margin: 20px 10px 0 0;

      .style-2 {
        display: flex;
        flex-direction: column;

        .input-title {
          width: 100%;
          text-align: left;
        }

        .input {
          width: 100%;
          input {
            width: 100%;
          }
        }

        textarea {
          width: 100%;
        }
      }
    }

    ${breakpoint("XS")} {
      width: 100%;
    }
  }

  .notify-textarea {
    margin-top: 20px;
    ${breakpoint("LG")} {
      width: 100%;
    }
  }

  .notify-group {
    flex-wrap: wrap;
  }

  .err-message {
    font-size: 13px;
    width: 100%;
    padding: 1px 6px;
    background-color: #ff000020;
  }
`;
