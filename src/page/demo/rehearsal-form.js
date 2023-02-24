import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
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
    justifyContent: "space-around",
  },
});

export default function Demo() {
  return (
    <PDFViewer style={styles.view}>
      <Document>
        <Page style={styles.page}>
          <View>
            <Text style={[styles.title, styles.bold]}>ใบรายงานแจ้งซ่อม</Text>
          </View>
          <View style={[styles.dataGroup, styles.date]}>
            <Text style={[styles.groupWidth1]}></Text>
            <Text style={[styles.groupWidth2]}>
              วันที่แจ้งซ่อม 19 สิงหาคม 2566
            </Text>
          </View>
          <View style={[styles.dataGroup, styles.bold]}>
            <Text style={[styles.groupWidth1]}>
              ผู้แจ้งซ่อม นายศราวุฒิ บุตราช
            </Text>
            <Text style={[styles.groupWidth2]}>ฝ่ายแผนงานและความร่วมมือ</Text>
          </View>
          <View style={[styles.dataGroup, styles.bold]}>
            <Text style={[styles.groupWidth1]}>อาคาร 1 ชั้น 5</Text>
            <Text style={[styles.groupWidth2]}>ห้อง 999</Text>
          </View>
          <View>
            <Text style={[styles.hr]}></Text>
          </View>
          <View style={[styles.dataGroup, styles.br]}>
            <Text style={[styles.notifyTitle, styles.bold]}>ประเภท</Text>
            <Text>คอมพิวเตอร์</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text style={[styles.notifyTitle, styles.bold]}>อาการ</Text>
            <Text>เปิดไม่ติด, รีสตาร์ท/ดับเอง, เครื่องค้าง, จอฟ้า/ดำ</Text>
          </View>
          <View style={[styles.dataGroup, styles.bold, styles.br]}>
            <Text style={[styles.detailTitle]}>รายละเอียดเพิ่มเติม</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text>
              หากคณะทำงานจัดการสอบวัดระดับภาษาญี่ปุ่นพิจารณาว่าไม่สามารถจัดการสอบวัดระดับภาษาญี่ปุ่น
              ให้เป็นไปโดยเรียบร้อยและปลอดภัยคณะทำงานฯ
              ขอสงวนสิทธิ์ในการยกเลิกการจัดสอบวัดระดับภาษาญี่ปุ่น
              โดยจะประกาศให้ทราบทางช่องทางการติดต่อของศูนย์สอบแต่ละแห่งและจะพยายามอย่างเต็มที่ในการแจ้ง
              เรื่องการยกเลิกดังกล่าวให้ผู้สมัครสอบรับทราบตามช่องทางติดต่อที่ได้ระบุไว้ในใบสมัคร
            </Text>
          </View>
          <View style={[styles.dataGroup, styles.br]}>
            <Text style={[styles.notifyTitle2, styles.bold]}>ผู้ดำเนินการ</Text>
            <Text>นายศราวุฒิ บุตราช</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text style={[styles.notifyTitle2, styles.bold]}>
              วันที่ดำเนินการ
            </Text>
            <Text>1 ม.ค. 2566 เวลา 16:06:23 น.</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text style={[styles.notifyTitle2, styles.bold]}>วันที่ส่งงาน</Text>
            <Text>5 ม.ค. 2566 เวลา 08:59:12 น.</Text>
          </View>
          <View style={[styles.dataGroup]}>
            <Text style={[styles.notifyTitle2, styles.bold]}>
              สถานะการดำเนินการ
            </Text>
            <Text>เสร็จสิ้น</Text>
          </View>
          <View style={[styles.signGroup]}>
            <View style={[styles.sign]}>
              <Text>ลงชื่อ………………………………………</Text>
              <Text>
                {` `}
                {`  (………………………………………)`}
              </Text>
              <Text> {`            หัวหน้างาน`}</Text>
            </View>
            <View style={[styles.sign]}>
              <Text>ลงชื่อ………………………………………</Text>
              <Text>
                {` `}
                {`  (………………………………………)`}
              </Text>
              <Text> {`            ผู้ปฏิบัติงาน`}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
