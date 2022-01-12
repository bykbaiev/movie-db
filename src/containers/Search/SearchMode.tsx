import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuDivider,MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
import { SearchModeState } from 'models/SearchResultsState';
import { useRecoilState } from 'recoil';
import { SearchMode } from 'recoil/SearchResults';

const LABEL: Record<SearchModeState, string> = {
  all: 'All',
  tv: 'TV Shows',
  people: 'People',
  movies: 'Movies'
};

const LABEL_WIDTH = 140;

export const Mode = () => {
  const [mode, setMode] = useRecoilState(SearchMode);

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
              <Text fontSize='sm' w={`${LABEL_WIDTH}px`} align='center'>{LABEL[mode]}</Text>
              <Spacer />
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuItem value='all' onClick={() => setMode('all')}>{LABEL.all}</MenuItem>
            <MenuDivider />
            <MenuItem value='movies' onClick={() => setMode('movies')}>{LABEL.movies}</MenuItem>
            <MenuItem value='people' onClick={() => setMode('people')}>{LABEL.people}</MenuItem>
            <MenuItem value='tv' onClick={() => setMode('tv')}>{LABEL.tv}</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
