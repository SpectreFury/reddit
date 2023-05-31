import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@components/Modal/Auth/AuthModal";

const RightContent: React.FC = () => {
  return (
    <React.Fragment>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </React.Fragment>
  );
};

export default RightContent;
