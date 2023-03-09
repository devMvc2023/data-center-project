import styled from "@emotion/styled";
import { PopupJs } from "component/common/popup";
import React, { useState } from "react";

export default function PublicPost({ data }) {
  const [preview, setPreview] = useState();

  return (
    <Style>
      
      {data?.images.length === 1 && (
        <div className="post-image1 group-image">
          {data?.images?.map((img, index) => {
            return (
              <div
                key={index}
                className="preview-image"
                onClick={() =>
                  setPreview(
                    `https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`
                  )
                }
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`}
                  alt="notify"
                />
              </div>
            );
          })}
        </div>
      )}
      {data?.images.length === 2 && (
        <div className="post-image2 group-image">
          {data?.images?.map((img, index) => {
            return (
              <div
                key={index}
                className={`preview-image2 img${index}`}
                onClick={() =>
                  setPreview(
                    `https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`
                  )
                }
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`}
                  alt="notify"
                />
              </div>
            );
          })}
        </div>
      )}
      {data?.images.length === 3 && (
        <div className="post-image3 group-image">
          {data?.images?.map((img, index) => {
            return (
              <div
                key={index}
                className={`preview-image3 img${index}`}
                onClick={() =>
                  setPreview(
                    `https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`
                  )
                }
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`}
                  alt="notify"
                />
              </div>
            );
          })}
        </div>
      )}
      {data?.images.length === 4 && (
        <div className="post-image4 group-image">
          {data?.images?.map((img, index) => {
            return (
              <div
                key={index}
                className={`preview-image4 img${index}`}
                onClick={() =>
                  setPreview(
                    `https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`
                  )
                }
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/data-center-service-86092.appspot.com/o/notify_images%2F${img}?alt=media&token=c31c5cf8-aa54-40a4-9235-d476d37fd4f1`}
                  alt="notify"
                />
              </div>
            );
          })}
        </div>
      )}
      {preview && (
        <PopupJs.jsx
          open={preview && true}
          maxWidth="60%"
          onClose={() => setPreview(null)}
        >
          <img src={preview} alt="notify-preview" />
        </PopupJs.jsx>
      )}
      <div className="post-footer">
      <div>{`ประชาสัมพันธ์ข่าวสาร ช่วงวันที่ ${data?.since_date} - ${data?.up_date}`}</div>

      <div className="title">{data?.note ? `เรื่อง ${data?.note}`:''}</div>
        <div className="tag">เกี่ยวข้องกับ 
          {data?.symptom.map((tag, index) => {
            return (
              <span key={index}>
                 {index === 0 ? "" : ","} {tag}
              </span>
            );
          })}
        </div>
      </div>
    </Style>
  );
}

const Style = styled.div`
  label: pubilc-post;

  max-width: 800px;
  margin: 0 auto 20px auto;

  .post-title {
    font-size: 16px;
    font-weight: 900;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 0 2px #00000050;
    padding: 16px;
  }

  .post-footer {
    font-size: 16px;
    font-weight: 900;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 2px #00000050;
    padding: 16px;
  }

  .group-image {
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 4px #00000050;

    img {
      cursor: pointer;
    }
  }

  .post-image2 {
    .preview-image2 {
      width: 50%;
    }

    .img0 {
      border-right: 2px solid #ffffff;
    }
  }

  .post-image3 {
    .img0 {
      width: 100%;
      border-bottom: 2px solid #ffffff;
    }
    .img1 {
      width: 50%;
      border-right: 2px solid #ffffff;
    }
    .img2 {
      width: 50%;
    }
  }

  .post-image4 {
    .img0 {
      width: 100%;
      border-bottom: 2px solid #ffffff;
    }
    .img1 {
      width: 33.2%;
      border-right: 2px solid #ffffff;
    }
    .img2 {
      width: 33.2%;
      border-right: 2px solid #ffffff;
    }
    .img3 {
      width: 33.2%;
    }
  }
`;
