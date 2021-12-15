import { Box } from '@chakra-ui/react';
import { MovieId } from 'models/Movie';
import { FC } from 'react';
import Slider, { Settings } from 'react-slick';

import { MovieSlide } from './MovieSlide';
import { SmallMovieSlide } from './SmallMovieSlide';

type Props = {
  ids: Array<MovieId>;
  settings?: Settings;
};

type BaseMovieListProps = Props & { tag: 'simple' | 'multiple', maxW: number | string };

const SLIDES = {
  simple: MovieSlide,
  multiple: SmallMovieSlide,
}

const BaseMovieList: FC<BaseMovieListProps> = ({ ids, settings, tag, maxW }) => {
  const slidesToShow = (tag === 'simple' ? 1 : 3);
  const sliderSettings: Settings = {
    infinite: true,
    autoplay: false,
    slidesToShow,
    slidesToScroll: slidesToShow,
    ...settings
  };

  const Slide = SLIDES[tag];

  return (
    <Box maxW={maxW} w='100%' m='0 auto'>
      <Slider {...sliderSettings}>
        {ids.map(id => <Slide id={id} key={id} />)}
      </Slider>
    </Box>
  );
};

export const MovieList: FC<Props> = ({ ids, settings }) => {
  return (
    <BaseMovieList tag='simple' ids={ids} settings={settings} maxW={850} />
  );
};

export const MultipleMovieList: FC<Props> = ({ ids, settings }) => {
  return (
    <BaseMovieList tag='multiple' ids={ids} settings={settings} maxW='100%' />
  );
};
