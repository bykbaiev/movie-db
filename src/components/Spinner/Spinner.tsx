import { Flex, Spinner as ChSpinner } from '@chakra-ui/react';

export const Spinner = () => (
  <Flex w='100%' align='center' justify='center' data-testid='spinner'>
    <ChSpinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  </Flex>
);
