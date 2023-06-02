import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@components/Modal/Auth/AuthModal";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <React.Fragment>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </React.Fragment>
  );
};

export default RightContent;
