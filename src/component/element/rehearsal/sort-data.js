const SortData = (data) => {
  data.sort((a, b) => a.notify_date - b.notify_date);

  const currentData1 = data.filter(
    (data) => data.urgent === "ด่วนมากที่สุด" && data.status !== "ปิดงาน"
  );
  const currentData2 = data.filter(
    (data) => data.urgent === "ด่วนมาก" && data.status !== "ปิดงาน"
  );
  const currentData3 = data.filter(
    (data) => data.urgent === "ด่วน" && data.status !== "ปิดงาน"
  );
  const currentData4 = data.filter(
    (data) => data.urgent === "ไม่ด่วน" && data.status !== "ปิดงาน"
  );
  const currentData5 = data.filter((data) => data.status === "ปิดงาน");

  currentData1.push(
    ...currentData2,
    ...currentData3,
    ...currentData4,
    ...currentData5
  );

  return currentData1;
};

export default SortData;
