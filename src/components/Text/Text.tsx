import * as CSS from 'csstype';
import styled from 'styled-components';
import { color,typography } from 'styled-system';

type Props = {
  className?: string;
} & CSS.Properties;

export const Text = styled.p<Props>`
  font-size: 1rem;
  color: #fff;
  ${typography}
  ${color}
`;
