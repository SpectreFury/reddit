import React from "react";
import { firestore } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CommunityNotFound from "@components/Community/NotFound";
import Header from "@components/Community/Header";
import PageContent from "@components/Layout/PageContent";
import safeJsonStringify from "safe-json-stringify";
import CreatePostLink from "@components/Community/CreatePostLink";
import Posts from "@components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import About from "@components/Community/About";

const CommunityPage = async ({ params }: { params: any }) => {
  const communityDocRef = doc(firestore, "communities", params.communityName);
  const communityDoc = await getDoc(communityDocRef);

  const communityData: any = communityDoc.exists()
    ? JSON.parse(
        safeJsonStringify({
          id: communityDoc.id,
          ...communityDoc.data(),
        })
      )
    : "";

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <React.Fragment>
      <Header communityData={communityData} />
      <PageContent>
        <React.Fragment>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </React.Fragment>
        <React.Fragment>
          <About communityData={communityData} />
        </React.Fragment>
      </PageContent>
    </React.Fragment>
  );
};

export default CommunityPage;
