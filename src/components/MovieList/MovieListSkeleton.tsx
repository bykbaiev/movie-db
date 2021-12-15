import { Box, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const HEIGHT = 445;

export const MovieListSkeleton = () => {
  return (
    <HStack w='100%' justify='space-between'>
      {[0, 1, 2].map(idx => (
        <Box key={idx} h={HEIGHT} w="32%">
          <SkeletonCircle size='20' />
          <SkeletonText mt={4} noOfLines={4} spacing={4} />
        </Box>
      ))}
    </HStack>
  )
}