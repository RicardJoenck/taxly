import {
  SkeletonText,
  Skeleton as ChakraSkeleton,
} from "@/components/chakra/skeleton";
import { Card, Stack } from "@chakra-ui/react";

const Skeleton = () => {
  return (
    <Card.Root width="300px">
      <Card.Body>
        <Stack>
          <SkeletonText noOfLines={4} />
          <ChakraSkeleton height="200px" />
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export { Skeleton };
