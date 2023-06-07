import React from "react";
import { IconType } from "react-icons";
import { MenuItem, Image, Flex, Icon } from "@chakra-ui/react";
import useDirectory from "@hooks/useDirectory";

type MenuListItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItem> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex alignItems="center">
        {imageURL ? (
          <Image
            borderRadius="full"
            boxSize="18px"
            src={imageURL}
            mr={2}
          ></Image>
        ) : (
          <Icon fontSize={20} mr={2} as={icon} color={iconColor}></Icon>
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
