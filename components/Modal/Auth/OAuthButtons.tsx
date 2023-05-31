import React, { useState, useEffect } from "react";
import { Flex, Button, Image } from "@chakra-ui/react";
import { getProviders, signIn } from "next-auth/react";

const OAuthButtons: React.FC = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        onClick={() => {
          signIn("credentials");
        }}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button>Some Other Provider</Button>
    </Flex>
  );
};

export default OAuthButtons;
