import React, { useState } from "react";
import { MenuItem, Flex, Icon, Box, Text } from "@chakra-ui/react";
import CreateCommunityModal from "@components/Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
import { communityState } from "../../../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

const Communities = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <React.Fragment>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={4} mb={4}>
        <Text pl={4} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={4} mb={4}>
        <Text pl={4} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
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
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Communities;
