import styled from "@emotion/styled";
import { DELETE, POST, PUT, UPDATE } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { FileUpload } from "component/common/form";
import {
  Contents,
  Group2,
  Section,
} from "component/common/page-layout/page-layout";
import { breakpoint, storage } from "component/common/util";
import LoadingPage from "component/element/loading";
import SignupForm from "component/element/signup/signup-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useProfile from "hooks/useProfile";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserEdit() {
  const [image, setImage] = useState([]);
  const [loading2, setLoading2] = useState(false);

  const { profile, setProfile, setEditProfile, loading } = useProfile();

  const navigate = useNavigate();

  const onUpdate = async (editData) => {
    let urlImg = [];

    let data = {
      title: editData.title,
      first_name: editData.first_name,
      last_name: editData.last_name,
      phone: editData.phone,
      user_faction: editData?.user_faction || null,
      user_name: editData?.user_name,
      user_image: urlImg[0] || profile.user_image || "",
      identity_id: editData.identity_id || "",
      line_qr: urlImg[1] || profile.line_qr || "",
      line_id: editData.line_id || "",
    };

    if (image.length > 0) {
      image.map((img, index) => {
        const imageRef = ref(storage, `user_images/${img.name}`);

        uploadBytes(imageRef, img).then((snapshot) => {
          setLoading2(true);

          getDownloadURL(snapshot.ref).then(async (url) => {
            urlImg[index] = url;

            if (urlImg.length === image?.length) {
              data = {
                ...data,
                user_image: urlImg[0] || profile.user_image || "",
                line_qr: urlImg[1] || profile.line_qr || "",
              };

              try {
                const res = await UPDATE("user", data, profile.data_id);

                if (res === "update success!") {
                  setEditProfile(null);
                  setProfile({ ...profile, ...data });
                  setLoading2(false);
                  navigate(`/user/${profile?.data_id}/account`);
                }
              } catch (error) {
                console.log("error", error);
              }
            }
          });
        });
      });
    }

    if (image.length === 0) {
      try {
        setLoading2(true);
        console.log("log >> file: edit.js:84 >> onUpdate >> data", data);

        const res = await UPDATE("user", data, profile.data_id);

        if (res === "update success!") {
          setEditProfile(null);
          setProfile({ ...profile, ...data });
          setLoading2(false);
          navigate(`/user/${profile?.data_id}/account`);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const onUpload = (event, index) => {
    let imageFile = [...image];

    imageFile[index] = event.target.files[0];

    setImage(imageFile);
  };

  return (
    <>
      <LoadingPage loading={loading || loading2} />
      <StyleExtendsSection>
        <Breadcrumbs
          icon="fas fa-user"
          title="แก้ไขข้อมูลบัญชี"
          className="edit-breadcrumbs"
        />
        <Contents className="edit-contents" padding="24px">
          <div className="edit-title ">ข้อมูลเกี่ยวกับบัญชี</div>
          <Group2 className="justify-content-around">
            <div className="edit-image img">
              {image[0] || profile?.user_image ? (
                <>
                  <div className="image img">
                    {image[0] ? (
                      <img src={URL.createObjectURL(image[0])} alt="image" />
                    ) : (
                      <img src={profile?.user_image} alt="image" />
                    )}
                  </div>
                  <FileUpload
                    className="upload-icon"
                    multiple={false}
                    name="user_image"
                    onChange={(event) => onUpload(event, 0)}
                  />
                </>
              ) : (
                <>
                  <div className="image img">
                    <img
                      src={require("image/logo/blankProfile.jpg")}
                      alt="image"
                    />
                  </div>
                  <FileUpload
                    className="upload-icon"
                    multiple={false}
                    name="user_image"
                    onChange={(event) => onUpload(event, 0)}
                  />
                </>
              )}
            </div>
            <div className="edit-image img2">
              {image[1] || profile?.line_qr ? (
                <>
                  <div className="image img2">
                    {image[1] ? (
                      <img src={URL.createObjectURL(image[1])} alt="image" />
                    ) : (
                      <img src={profile?.line_qr} alt="image" />
                    )}
                  </div>
                  <FileUpload
                    className="upload-icon"
                    multiple={false}
                    name="line_qr"
                    onChange={(event) => onUpload(event, 1)}
                  />
                </>
              ) : (
                <>
                  <div className="image img2">
                    <img src={require("image/blank-qrcode2.png")} alt="image" />
                  </div>
                  <FileUpload
                    className="upload-icon"
                    multiple={false}
                    name="line_qr"
                    onChange={(event) => onUpload(event, 1)}
                  />
                </>
              )}
            </div>
          </Group2>
          <form>
            <SignupForm onSignup={onUpdate} />
          </form>
        </Contents>
      </StyleExtendsSection>
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: user-edit;

  font-weight: 900;

  .edit-breadcrumbs {
    max-width: 800px;
  }

  .edit-contents {
    max-width: 800px;
  }

  .edit-title {
    font-size: 1.4rem;
    text-align: center;
    padding: 24px 0;
  }

  .img {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: rgb(204, 204, 204);
    ${breakpoint("XS")} {
      width: 130px;
      height: 130px;
    }
  }

  .img2 {
    position: relative;
    width: 150px;
    height: 150px;

    ${breakpoint("XS")} {
      width: 130px;
      height: 130px;
    }
  }

  .edit-image {
    margin-bottom: 30px;

    .image {
      overflow: hidden;
      border: 5px solid rgb(193, 193, 193);

      img {
        object-fit: cover;
      }
    }

    .upload-icon {
      position: absolute;
      bottom: 0px;
      right: 0px;

      > * {
        font-size: 20px;
        padding: 0;
      }
    }
  }
`;
