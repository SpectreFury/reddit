import React from "react";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <div>
      <Flex direction="column" align="center" width="100%" mt={4}>
        {modalState.view === "login" && <Login />}
        {modalState.view === "signup" && <SignUp />}
      </Flex>
    </div>
  );
};

export default AuthInputs;
