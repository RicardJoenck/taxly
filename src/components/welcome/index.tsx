import { Heading, Text, VStack } from "@chakra-ui/react";

const Welcome = () => (
  <VStack align="center" mb={6} p={4}>
    <Heading as="h1" size="lg" color="grey.300">
      Welcome to the Taxly
    </Heading>
    <Text fontSize="xl" color="gray.700" textAlign="center">
      Get ready to crunch some numbers and wonder why the government’s share is
      a little too generous!
    </Text>
  </VStack>
);

export { Welcome };
