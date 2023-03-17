import styled from "@emotion/styled";
import Breadcrumbs from "component/common/breadcrumbs";
import { Contents, Section } from "component/common/page-layout/page-layout";
import { breakpoint } from "component/common/util";
import React from "react";

export default function Team() {
  return (
    <StyleExtendsSection>
      <Breadcrumbs
        maxWidth={"900px"}
        title={"คณะผู้จัดทำ"}
        icon={"fas fa-users"}
      />
      <Contents className="team-content">
        <div className="team-title">
          <div>
           ระบบการให้บริการงานศูนย์ข้อมูลสารสนเทศ
          </div>
          <div>
            Information Data Center Service System
          </div>
        </div>
        <div className="team-name-title">คณะผู้จัดทำ</div>
        <div className="team-name">
          <div className="name">1. นายศราวุฒิ บุตราช</div>
          <div>63202040034</div>
        </div>
        <div className="team-name">
          <div className="name">2. นายรชต สมนึกในธรรม</div>
          <div>63202040044</div>
        </div>
        <div className="team-name">
          <div className="name">3. นางสาวดาราวัลย์ ผุยอุทา</div>
          <div>63202040033</div>
        </div>
        <div className="team-name-title">ครูที่ปรึกษา</div>
        <div className="team-name">
          <div className="name">1. ครูประมุข ธรรมศิรารักษ์</div>
          <div>ครูที่ปรึกษาหลัก</div>
        </div>
        <div className="team-name">
          <div className="name">2. ครูขวัญจิต ธรรมศิรารักษ์</div>
          <div>ครูที่ปรึกษาร่วม</div>
        </div>
        <div className="team-name">
          <div className="name">3. ครูภูวนัย สุโพธ์</div>
          <div>ครูที่ปรึกษาร่วม</div>
        </div>
      </Contents>
    </StyleExtendsSection>
  );
}

const StyleExtendsSection = styled(Section)`
  label: organizing-team;

  .team-content {
    max-width: 900px;
    padding: 30px 40px;
  }

  .team-title {
    font-size: 20px;
    font-weight: 900;
    // text-align: center;
  }

  .team-name-title {
    font-weight: 900;
    font-size: 18px;
    margin-top: 20px;
  }

  .team-name {
    display: flex;
    font-size: 16px;
    font-weight: 600;

    .name {
      width: 30%;

      ${breakpoint("MD")} {
        width: 50%;
      }
    }

    ${breakpoint(600)} {
      flex-direction: column;
      .name {
        width: 100%;
      }
    }
  }
`;
