import React from "react";
import { firestore } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CommunityNotFound from "@components/Community/NotFound";
import Header from "@components/Community/Header";
import PageContent from "@components/Layout/PageContent";
import safeJsonStringify from "safe-json-stringify";

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
          <div>LHS</div>
        </React.Fragment>
        <React.Fragment>
          <div>RHS</div>
        </React.Fragment>
      </PageContent>
    </React.Fragment>
  );
};

export default CommunityPage;
