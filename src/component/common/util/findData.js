const FindData = (data, findData) => {
  return findData.find((value) => value.title === data)?.detail;
};

export default FindData;
