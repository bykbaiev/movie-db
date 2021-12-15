import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  link: string;
}

const YELLOW = '#f5c518';

export const SectionHeading: FC<Props> = ({ title, link }) => {
  const baseCls = `section-heading`;

  return (
    <Link to={link}>
      <Heading
        className={baseCls}
        pos='relative'
        ml={4}
        color={COLOR.WHITE}
        cursor='pointer'
        _before={{
          content: `''`,
          display: 'block',
          position: 'absolute',
          backgroundColor: YELLOW,
          width: '4px',
          height: '100%',
          borderRadius: '4px',
          marginLeft: '-16px'
        }}
      >
        {title}
        <ChevronRightIcon
          ml={1}
          boxSize={45}
          sx={{
            [`.${baseCls}:hover &`]: {
              color: YELLOW,
            },
          }} />
      </Heading>
    </Link>
  )
};
