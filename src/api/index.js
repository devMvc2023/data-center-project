import { db } from "component/common/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const GetAll = async (path) => {
  const dataSnapShot = await getDocs(collection(db, path));
  const dataList = dataSnapShot.docs.map((document) => ({
    data_id: document.id,
    ...document.data(),
  }));
  return dataList;
};

const GetOne = async (path, id) => {
  const dataSnapShot = await getDoc(doc(db, path, id));

  const dataList = { data_id: dataSnapShot.id, ...dataSnapShot.data() };

  return dataList;
};

const GetWhere = async (path, path2, value) => {
  const q = query(collection(db, path), where(path2, "==", value));
  const dataSnapShot = await getDocs(q);
  const dataList = dataSnapShot.docs.map((document) => ({
    data_id: document.id,
    ...document.data(),
  }));

  return dataList;
};

const POST = (path, data) => {
  return addDoc(collection(db, path), data);
};

const UPDATE = async (path, data, id) => {
  const updateRef = doc(db, path, id);

  const status = await updateDoc(updateRef, data)
    .then(() => {
      return "update success!";
    })
    .catch((error) => {
      return `error ${error}`;
    });

  return status;
};

const DELETE = async (path, id) => {
  const deleteRef = doc(db, path, id);

  const status = await deleteDoc(deleteRef)
    .then(() => {
      return "delete success!";
    })
    .catch((error) => {
      return `error ${error}`;
    });

  return status;
};

export { POST, DELETE, GetAll, GetOne, UPDATE, GetWhere };
