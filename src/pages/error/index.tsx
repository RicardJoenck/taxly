import { Button, Card, Flex, Heading, VStack } from "@chakra-ui/react";
import type { FallbackProps } from "react-error-boundary";

const Error = ({ resetErrorBoundary }: FallbackProps) => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <Card.Root>
      <Card.Body>
        <VStack>
          <Heading>Oops!</Heading>
          <p>Sorry, an unexpected error has occurred.</p>
          <Button onClick={() => resetErrorBoundary()}>Try Again</Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Flex>
);

export { Error };
