"use client";

import React, { useEffect } from "react";
import PageContent from "@components/Layout/PageContent";
import PostItem from "@components/Posts/PostItem";
import usePosts from "@hooks/usePosts";
import { auth, firestore } from "../../../../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "../../../../../atoms/postsAtom";
import About from "@components/Community/About";
import { communityState } from "../../../../../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import Comments from "@components/Posts/Comments/Comments";
import { User } from "firebase/auth";

const PostPage = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  const [user] = useAuthState(auth);
  const params = useParams();
  const { pid } = params;
  const communityStateValue = useRecoilValue(communityState);

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error) {
      console.log("fetchPost error", error);
    }
  };

  useEffect(() => {
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [pid, postStateValue.selectedPost]);

  return (
    <PageContent>
      <React.Fragment>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        <Comments
          user={user as User}
          selectedPost={postStateValue.selectedPost}
          communityId={postStateValue.selectedPost?.communityId as string}
        />
      </React.Fragment>
      <React.Fragment>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </React.Fragment>
    </PageContent>
  );
};

export default PostPage;
