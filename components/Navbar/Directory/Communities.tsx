import React, { useState } from "react";
import { MenuItem, Flex, Icon } from "@chakra-ui/react";
import CreateCommunityModal from "@components/Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";

const Communities = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Flex>
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </React.Fragment>
  );
};

export default Communities;
