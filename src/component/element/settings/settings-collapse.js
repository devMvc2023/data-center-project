import CollapseComplete from "component/common/collapse";
import { Button } from "component/common/page-layout/page-layout";
import Table from "component/common/table";
import { AddButton } from "page/settings";
import React from "react";

export default function SettingsCollapse({
  title,
  data,
  path,
  onEdit = () => null,
  onEdit2 = () => null,
  onDelete = () => null,
}) {
  return (
    <CollapseComplete title={title} padding="16px">
      <Table
        className="settings-item"
        td={data?.map((d, index) => {
          return (
            <tr key={index}>
              <td className="edit-title">{d.name}</td>
              <td className="text-center edit-button">
                <Button
                  padding="0"
                  fontSize="14px"
                  height="25px"
                  width="60px"
                  onClick={() => onEdit(d)}
                >
                  แก้ไข
                </Button>
              </td>
              <td className="text-center edit-button">
                <Button
                  padding="0"
                  fontSize="14px"
                  height="25px"
                  width="60px"
                  onClick={() => onDelete(d)}
                >
                  ลบ
                </Button>
              </td>
            </tr>
          );
        })}
      />
      <AddButton>
        <div className="add-button" onClick={onEdit2}>
          เพิ่มข้อมูล
        </div>
      </AddButton>
    </CollapseComplete>
  );
}
