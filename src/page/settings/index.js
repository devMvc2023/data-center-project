import styled from "@emotion/styled";
import { async } from "@firebase/util";
import { DELETE, GetAll, GetOne, POST, UPDATE } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { Input } from "component/common/form";
import {
  Button,
  Contents,
  Group,
  Section,
} from "component/common/page-layout/page-layout";
import { PopupJs } from "component/common/popup";
import { breakpoint } from "component/common/util";
import LoadingPage from "component/element/loading";
import SettingsCollapse from "component/element/settings/settings-collapse";
import React, { useEffect, useState } from "react";

function Settings() {
  const [faction, setFaction] = useState();
  const [subject, setSubject] = useState();
  const [position, setPosition] = useState();
  const [repairs, setRepairs] = useState();
  const [title, setTitle] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [confilm, setConfilm] = useState({
    open: false,
    index: null,
    edit: false,
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [path, setPath] = useState();

  const onUpdateData = async () => {
    setLoading(true);

    const data = {
      id: dataDetail.id,
      name: dataDetail.name,
      detail: dataDetail.detail,
    };

    try {
      let res = {};
      if (dataDetail.data_id) {
        res = await UPDATE(path.path, data, dataDetail.data_id);
      }

      if (!dataDetail.data_id) {
        res = await POST(path.path, data);
      }

      if (res === "update success!" || res.id) {
        setLoading2(true);
        setOpenEdit(false);
        setLoading(false);
      }
    } catch (error) {
      console.log("log >> file: index.js:30 >> onUpdateData >> error", error);
    }
  };

  const onDeleteData = async (event) => {
    setLoading(true);

    const notDeleteData = dataDetail.detail.filter(
      (item, index) => index !== event
    );

    const dataUp = { ...dataDetail, detail: notDeleteData };

    setDataDetail(null);

    if (path.id !== null) {
      try {
        const res = await UPDATE(path.path, dataUp, path.id);
        const data = await GetOne(path.path, path.id);

        if (res === "update success!" && data.data_id) {
          setLoading2(true);
          setDataDetail(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("log >> file: index.js:63 >> onDeleteData >> error", error);
      }
    } else {
      setDataDetail(dataUp);
      setLoading(false);
    }
  };

  const onDeleteDatabase = async () => {
    setLoading(true);

    const res = await DELETE(confilm.path, confilm.data.data_id);

    if (res === "delete success!") {
      setConfilm({ open: false, index: null, data: [], path: "" });
      setLoading2(true);
      setLoading(false);
    }
  };

  const onChangeText = (event, index) => {
    let dataArr = [...dataDetail?.detail];

    dataArr[index] = event.target.value;

    setDataDetail({ ...dataDetail, detail: dataArr });
  };

  const onClose = () => {
    setDataDetail(null);
    setPath("");
    setOpenEdit(false);
  };

  const onEditData = (data, path) => {
    setDataDetail(data);
    setPath({ path: path, id: data.data_id || null });
    setOpenEdit(true);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setLoading2(false);

      const faction = await GetAll("faction");
      const subject = await GetAll("subject");
      const position = await GetAll("position");
      const repairs = await GetAll("repairs_list");
      const title = await GetAll("title");

      setFaction(faction.sort((a, b) => a.id - b.id));
      setSubject(subject.sort((a, b) => a.id - b.id));
      setRepairs(repairs.sort((a, b) => a.id - b.id));
      setTitle(title.sort((a, b) => a.id - b.id));
      setPosition(position.sort((a, b) => a.id - b.id));
      setLoading(false);
    };

    getData();
  }, [loading2]);

  return (
    <>
      <StyleExtendsSection>
        {!openEdit ? (
          <>
            <Breadcrumbs
              icon="fas fa-cog"
              title="ตั้งค่า"
              className="settings-breadcrumbs"
            />
            <Contents className="settings-contents">
              <Group className="settings-group">
                <div className="settings-table">
                  <SettingsCollapse
                    title="ฝ่ายงาน"
                    path="faction"
                    data={faction}
                    onEdit={(data) => onEditData(data, "faction")}
                    onEdit2={() =>
                      onEditData(
                        {
                          id: faction[faction?.length - 1]?.id + 1,
                          name: "",
                          detail: [],
                        },
                        "faction"
                      )
                    }
                    onDelete={(data) =>
                      setConfilm({
                        open: true,
                        data: data,
                        path: "faction",
                      })
                    }
                  />
                </div>
                <div className="settings-table">
                  <SettingsCollapse
                    title="ประเภทวิชา"
                    path="subject"
                    data={subject}
                    onEdit={(data) => onEditData(data, "subject")}
                    onEdit2={() =>
                      onEditData(
                        {
                          id: subject[subject?.length - 1]?.id + 1,
                          name: "",
                          detail: [],
                        },
                        "subject"
                      )
                    }
                    onDelete={(data) =>
                      setConfilm({
                        open: true,
                        data: data,
                        path: "subject",
                      })
                    }
                  />
                </div>
              </Group>
              <Group className="settings-group">
                <div className="settings-table">
                  <SettingsCollapse
                    title="ตำแหน่ง"
                    path="position"
                    data={position}
                    onEdit={(data) => onEditData(data, "position")}
                    onEdit2={() =>
                      onEditData(
                        {
                          id: position[position?.length - 1]?.id + 1,
                          name: "",
                          detail: [],
                        },
                        "position"
                      )
                    }
                    onDelete={(data) =>
                      setConfilm({
                        open: true,
                        data: data,
                        path: "position",
                      })
                    }
                  />
                </div>
                <div className="settings-table">
                  <SettingsCollapse
                    title="คำนำหน้า"
                    path="title"
                    data={title}
                    onEdit={(data) => onEditData(data, "title")}
                    onEdit2={() =>
                      onEditData(
                        {
                          id: title[title?.length - 1]?.id + 1,
                          name: "",
                          detail: [],
                        },
                        "title"
                      )
                    }
                    onDelete={(data) =>
                      setConfilm({
                        open: true,
                        data: data,
                        path: "title",
                      })
                    }
                  />
                </div>
              </Group>
              <Group className="settings-group">
                <div className="settings-table">
                  <SettingsCollapse
                    title="บริการ"
                    path="repairs_list"
                    data={repairs}
                    onEdit={(data) => onEditData(data, "repairs_list")}
                    onEdit2={() =>
                      onEditData(
                        {
                          id: repairs[repairs?.length - 1]?.id + 1,
                          name: "",
                          detail: [],
                        },
                        "repairs_list"
                      )
                    }
                    onDelete={(data) =>
                      setConfilm({
                        open: true,
                        data: data,
                        path: "repairs_list",
                      })
                    }
                  />
                </div>
              </Group>
            </Contents>
            {confilm.open && (
              <PopupJs.jsx
                title={<div className="text-center">ยืนยันการลบข้อมูล</div>}
                open={confilm.open && true}
                onClose={() =>
                  setConfilm({ open: false, index: null, data: [], path: "" })
                }
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
                          index: null,
                          data: [],
                          path: "",
                        })
                      }
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      type="button"
                      margin="0 20px 0 auto"
                      bgc="#28a745"
                      onClick={onDeleteDatabase}
                    >
                      ยืนยัน
                    </Button>
                  </>
                }
              ></PopupJs.jsx>
            )}
          </>
        ) : (
          <EditContent>
            <div className="edit">
              <div className="edit-title">
                <EditInput>
                  <Input
                    name="title"
                    value={dataDetail?.name}
                    defaultValue={dataDetail?.name}
                    onChange={(event) =>
                      setDataDetail({ ...dataDetail, name: event.target.value })
                    }
                    className="edit-input"
                  />
                </EditInput>
              </div>

              <div className="edit-body">
                {dataDetail?.detail && (
                  <EditInput>
                    {dataDetail?.detail.map((data, index) => {
                      return (
                        <div className="group" key={index}>
                          <Input
                            width="90%"
                            title={`${index + 1}`}
                            titleWidth={"2rem"}
                            style={"2"}
                            value={data}
                            defaultValue={data}
                            onChange={(event) => onChangeText(event, index)}
                            className="edit-input-detail"
                          />
                          <Button
                            width="8%"
                            padding="0"
                            height="30px"
                            type="button"
                            bgc="var(--red-7)"
                            className="delete-button"
                            onClick={() => onDeleteData(index)}
                          >
                            ลบ
                          </Button>
                        </div>
                      );
                    })}

                    {path.path !== "position" && path.path !== "title" && (
                      <AddButton>
                        <div
                          className="add-button"
                          onClick={() =>
                            setDataDetail({
                              ...dataDetail,
                              detail: [...dataDetail.detail, ""],
                            })
                          }
                        >
                          เพิ่มข้อมูล
                        </div>
                      </AddButton>
                    )}
                  </EditInput>
                )}
              </div>
              <div className="edit-footer">
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
                  onClick={onUpdateData}
                >
                  ตกลง
                </Button>
              </div>
            </div>
          </EditContent>
        )}
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
  );
}

export default Settings;
export { AddButton };

const StyleExtendsSection = styled(Section)`
  label: settings;

  .settings-breadcrumbs {
    max-width: 1100px;
  }

  .settings-contents {
    padding: 20px;
    max-width: 1100px;

    ${breakpoint("MD")} {
      min-height: calc(var(--body-height) - 60px - var(--navbar-height));
    }
  }

  .settings-group {
    ${breakpoint("MD")} {
      flex-direction: column;
    }
  }

  .settings-table {
    width: 49%;
    font-weight: 600;

    .settings-item {
      margin-top: 6px;
    }

    ${breakpoint("MD")} {
      width: 100%;
    }
  }

  td {
    height: 40px;
  }

  .edit-button {
    width: 16%;
  }
`;

const EditInput = styled.div`
  label: edit-input;

  .input-title {
    text-align: center;
  }

  .edit-input {
    display: flex;
    align-items: flex-end;
    height: fit-content;
    margin: 0;

    input {
      font-weight: 900;
      font-size: 20px;
      height: 2.5rem;
      color: var(--gray-1);
    }
  }

  .group {
    position: relative;
    display: flex;

    .edit-input-detail {
      margin: 0 0 15px 0;

      .input {
        width: 100%;

        input {
          font-weight: 600;
          font-size: 16px;
          color: var(--gray-1);
          width: 100%;

          ${breakpoint("LG")} {
            input {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;

const AddButton = styled.div`
  label: add-button;

  margin: 0 10px 0 0;

  .add-button {
    width: fit-content;
    margin: 0 0 0 auto;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const EditContent = styled(Contents)`
  label: settings-edit-content;

  max-width: 500px;
  margin-top: 40px;
  .edit {
    width: 100%;
    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 90%;
      max-width: ${(props) => props.maxWidth};
      max-height: ${(props) =>
        props.maxHeight ? props.maxHeight : "calc(100vh - 3.5rem)"};
      margin: auto;
      border-radius: 6px;
      z-index: 2;
      background-color: #fff;

      ${breakpoint("LG")} {
        max-width: 93%;
      }

      ${breakpoint("XS")} {
        width: 93%;
      }
    }

    &-body {
      padding: 15px;
      width: 100%;
      overflow-x: auto;

      .body-title {
        color: #ffffff;
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.5rem;
      }
    }

    &-close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 1rem;
      height: 1rem;
      font-size: 0;
      border: none;
      padding: 0;
      background-color: transparent;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        top: calc(50% - 2px);
        left: 0;
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: var(--gray-2);
        transform: rotate(45deg);
      }

      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 2px);
        left: 0;
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: var(--gray-2);
        transform: rotate(45deg);
        transform: rotate(-45deg);
      }
    }

    &-title {
      font-size: 1.4em;
      font-weight: 600;
      padding: 1rem;
      color: var(--gray-1);
      border-bottom: 1px solid #dee2e6;

      i {
        margin-right: 10px;
        color: #000000;
      }
    }

    &-footer {
      display: flex;
      z-index: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;

      button {
        &.btn-underline {
          width: fit-content;
          box-shadow: none;
          color: var(--gray-2);
          background-color: transparent;
          font-family: var(--detail2-font-th);
          > span {
            text-decoration: underline;
          }
          &:disabled {
            color: var(--gray-1) !important;
            background-color: transparent !important;
            cursor: not-allowed;
          }
        }
      }

      ${breakpoint("XS")} {
        &.footer-button-revers {
          flex-wrap: wrap-reverse;
        }
      }
    }
  }
`;
