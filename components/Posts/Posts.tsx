"use client";

import React, { useState, useEffect } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { firestore, auth } from "../../firebase/firebaseConfig";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import usePosts from "@hooks/usePosts";
import { Post } from "../../atoms/postsAtom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";
import { communityState } from "../../atoms/communitiesAtom";
import { useSetRecoilState } from "recoil";

type PostsProp = {
  communityData: Community;
};

const Posts: React.FC<PostsProp> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();
  const [user] = useAuthState(auth);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const getPosts = async () => {
    try {
      setLoading(true);
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();

    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === item.id)
                  ?.voteValue
              }
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </React.Fragment>
  );
};

export default Posts;
