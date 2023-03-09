import styled from "@emotion/styled";
import { GetWhere } from "api";
import Breadcrumbs from "component/common/breadcrumbs";
import { Contents, Section } from "component/common/page-layout/page-layout";
import LoadingPage from "component/element/loading";
import PublicPost from "component/element/public-relations/post";
import React, { useEffect, useState } from "react";

export default function PublicRelations() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const postData = await GetWhere(
        "notify_data",
        "repairs_list",
        "ประชาสัมพันธ์ข่าวสาร"
      );

      const date = new Date();

      const postData2 = postData.filter(
        (data) =>
          data?.status === "อนุญาต" &&
          date > new Date(data?.since_date?.seconds * 1000) &&
          date < new Date(data?.up_date?.seconds * 1000)
      );

      // if (postData2) {
      //   postData2.map((data) => {
      //     const since_date = new Date(data?.since_date?.seconds * 1000);
      //     const up_date = new Date(data?.up_date?.seconds * 1000);

      //     data.since_date = since_date.toLocaleDateString("th-TH", {
      //       dateStyle: "medium",
      //     });
      //     data.up_date = up_date.toLocaleDateString("th-TH", {
      //       dateStyle: "medium",
      //     });
      //   });
      // }

      setPost(postData2.sort((a, b) => a.notify_date - b.notify_date));
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <StyleExtendsSection>
        <Breadcrumbs
          className="pubilc-breadcrumbs"
          icon="fas fa-bullhorn"
          title="ประชาสัมพันธ์ข่าวสาร"
        />
        {post.length > 0 &&
          post?.map((data, index) => {
            return <PublicPost data={data} key={index} />;
          })}
        {post.length === 0 && (
          <Contents className="not-have-post">
            ยังไม่มีการประชาสัมพันธ์ข่าวสาร
          </Contents>
        )}
      </StyleExtendsSection>
      <LoadingPage loading={loading} />
    </>
  );
}

const StyleExtendsSection = styled(Section)`
  label: rehersal;

  .pubilc-breadcrumbs {
    max-width: 800px;
  }

  .not-have-post {
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    max-width: 800px;
  }
`;
