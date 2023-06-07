"use client";

import React from "react";
import PageContent from "@components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@components/Posts/NewPostForm";
import { auth } from "../../../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { communityState } from "../../../../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import useCommunityData from "@hooks/useCommunityData";
import About from "@components/Community/About";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  console.log(communityStateValue);

  return (
    <PageContent>
      <React.Fragment>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue?.currentCommunity?.imageURL}
          />
        )}
      </React.Fragment>
      <React.Fragment>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </React.Fragment>
    </PageContent>
  );
};

export default SubmitPostPage;
