import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Font,
  View,
  Text,
} from "@react-pdf/renderer";
import { THSarabunNew, THSarabunNewBold } from "font";

Font.register({
  family: "THSarabunNewBold",
  fonts: [{ src: THSarabunNewBold }],
});

Font.register({
  family: "THSarabunNew",
  fonts: [{ src: THSarabunNew }],
});

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: window.innerHeight,
  },
  page: {
    padding: "2.54cm",
    fontFamily: "THSarabunNew",
    fontSize: "16px",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
  },
  bold: {
    fontFamily: "THSarabunNewBold",
  },
  br: {
    marginTop: "10px",
  },
  hr: {
    borderTop: "0.5px solid var(--gray-1)",
    margin: "6px 0",
    width: "100%",
  },
  date: {
    marginTop: "20px",
  },
  dataGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: "18px",
  },
  groupWidth1: {
    width: "600px",
  },
  groupWidth2: {
    width: "400px",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowHeader: {
    backgroundColor: "#ebebeb",
  },
  tableBorder: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "0 4px 0 4px",
  },
  cell3: {
    width: "25%",
    textAlign: "center",
  },
  notifyTitle: {
    width: "60px",
  },
  notifyTitle2: {
    width: "120px",
  },
  detailTitle: {
    fontSize: "18px",
  },
  detail: {
    display: "flex",
    width: "450px",
  },
  signGroup: {
    marginTop: "auto",
    flexDirection: "row",
  },
  sign: {
    width: "50%",
    textAlign: "center",
  },
});

const NotifyReport = ({ notifyData }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={[styles.title, styles.bold]}>ใบรายงานการปฎิบัติงาน</Text>
      </View>
      <View style={[styles.dataGroup, styles.date]}>
        <Text style={[styles.groupWidth1]}></Text>
        <Text style={[styles.groupWidth2]}>
          วันที่ขอรับบริการ 19 สิงหาคม 2566
        </Text>
      </View>
      <View style={[styles.dataGroup, styles.bold]}>
        <Text style={[styles.groupWidth1]}>
          ผู้ขอรับบริการ {notifyData.user_name}
        </Text>
        <Text style={[styles.groupWidth2]}>{notifyData.where_detail}</Text>
      </View>
      <View>
        <Text style={[styles.hr]}></Text>
      </View>
      <View style={[styles.dataGroup, styles.br]}>
        <Text style={[styles.notifyTitle2, styles.bold]}>บริการ</Text>
        <Text>{notifyData.repairs_list}</Text>
      </View>
      <View style={[styles.dataGroup]}>
        <Text style={[styles.notifyTitle2, styles.bold]}></Text>
        {notifyData.symptom.map((data, index) => {
          return (
            <Text key={index}>
              {index === 0 ? "" : ", "}
              {data}
            </Text>
          );
        })}
      </View>
      {notifyData.location && (
        <View style={[styles.dataGroup]}>
          <Text style={[styles.notifyTitle2, styles.bold]}>สถานที่</Text>
          <Text>{notifyData.location}</Text>
        </View>
      )}
      {notifyData.note && (
        <>
          <View style={[styles.dataGroup, styles.bold, styles.br]}>
            <Text style={[styles.detailTitle]}>รายละเอียดเพิ่มเติม</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text>{notifyData.note}</Text>
          </View>
        </>
      )}
      <View style={[styles.dataGroup]}>
        <Text style={[styles.notifyTitle2, styles.bold]}>ผู้ดำเนินการ</Text>
        <Text>{notifyData.contractor}</Text>
      </View>
      <View style={[styles.dataGroup]}>
        <Text style={[styles.notifyTitle2, styles.bold]}>วันที่ดำเนินการ</Text>
        <Text>{`${notifyData.execution_date} เวลา ${notifyData.execution_time} น.`}</Text>
      </View>
      <View style={[styles.dataGroup]}>
        <Text style={[styles.notifyTitle2, styles.bold]}>วันที่ปิดงาน</Text>
        <Text>{`${notifyData.finish_date} เวลา ${notifyData.finish_time} น.`}</Text>
      </View>
      <View style={[styles.dataGroup]}>
        <Text style={[styles.notifyTitle2, styles.bold]}>
          สถานะการดำเนินการ
        </Text>
        <Text>{notifyData.status}</Text>
      </View>
      <View style={[styles.signGroup]}>
        <View style={[styles.sign]}>
          <Text>ลงชื่อ…………………………………………………</Text>
          <Text>{`(${notifyData.contractor})`}</Text>
          <Text>ผู้ปฎิบัติงาน</Text>
          <Text>เจ้าหน้าที่งานศูนย์ข้อมูลสารสนเทศ</Text>
        </View>
        <View style={[styles.sign]}>
          <Text>ลงชื่อ…………………………………………………</Text>
          <Text>{`(นายประมุข ธรรมศิรารักษ์)`}</Text>
          <Text>ผู้รับรองการปฎิบัติงาน</Text>
          <Text>หัวหน้างานศูนย์ข้อมูลสารสนเทศ</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default NotifyReport;
