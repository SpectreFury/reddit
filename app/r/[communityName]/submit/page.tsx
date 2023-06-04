"use client";

import React from "react";
import PageContent from "@components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@components/Posts/NewPostForm";
import { auth } from "../../../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { communityState } from "../../../../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);

  console.log(communityStateValue);

  return (
    <PageContent>
      <React.Fragment>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPostForm user={user} />
      </React.Fragment>
      <React.Fragment></React.Fragment>
    </PageContent>
  );
};

export default SubmitPostPage;
