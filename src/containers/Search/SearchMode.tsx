import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuDivider,MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

export const SearchMode = () => {
  const [mode, setMode] = useState('all');

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            bgColor='white'
            borderRadius='6px'
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            h='32px'
          >
            <Flex alignItems='center'>
              {mode}
              <Spacer />
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </MenuButton>
          <MenuList>  
            <MenuItem value='all' onClick={() => setMode('all')}>All</MenuItem>
            <MenuDivider />
            <MenuItem value='movies' onClick={() => setMode('movies')}>Movies</MenuItem>
            <MenuItem value='people' onClick={() => setMode('people')}>People</MenuItem>
            <MenuItem value='tv' onClick={() => setMode('tv')}>TV Shows</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
