import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  communityState,
  Community,
  CommunitySnippet,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDocs,
  collection,
  writeBatch,
  doc,
  increment,
  getDoc,
} from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";
import { useParams } from "next/navigation";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const params = useParams();
  const { communityName } = params;

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`), {
        newSnippet,
      });

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leavingCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error) {
      console.log("getCommunityData error", error);
    }
  };

  useEffect(() => {
    if (communityName && !communityStateValue.currentCommunity) {
      getCommunityData(communityName as string);
    }
  }, [communityName, communityStateValue.currentCommunity]);

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    joinCommunity,
    leaveCommunity,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
