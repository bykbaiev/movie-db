import { Box, Text } from '@chakra-ui/react';
import { MultipleMovieList } from 'components/MovieList';
import { SectionHeading } from 'components/SectionHeading';
import { COLOR } from 'css-constants';
import { WatchlistState } from 'models/WatchlistState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { WatchlistIds } from 'recoil/Watchlist';

export const Watchlist = () => {
  const ids = useRecoilValue(WatchlistIds);

  return (
    <Box pt={4} m='0 auto'>
      <SectionHeading title='From your Watchlist' link='/popular' />
      <Box mb={4} />
      <Content ids={ids} />
    </Box>
  );
};

type ContentProps = {
  ids: WatchlistState;
}

const Content: FC<ContentProps> = ({ ids }) => {
  const slidesNo = Math.min(ids.length, 6);
  const settings = {
    slidesToShow: slidesNo,
    slidesToScroll: slidesNo
  };

  if (ids.length === 0) {
    return (<Text color={COLOR.WHITE}>Your watchlist is empty!</Text>);
  }

  return (
    <MultipleMovieList ids={ids} settings={settings} />
  );
};
