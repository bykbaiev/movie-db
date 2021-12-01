import { Box } from 'components/Box';
import * as CSS from 'csstype';
import styled from 'styled-components';
import { flexbox } from 'styled-system';

type Props = {
  className?: string;
  alignContent?: CSS.Property.AlignContent | CSS.Property.AlignContent[];
  alignItems?: CSS.Property.AlignItems | CSS.Property.AlignItems[];
  alignSelf?: CSS.Property.AlignSelf | CSS.Property.AlignSelf[];
  flex?: string | string[];
  flexBasis?: string | string[];
  flexDirection?: CSS.Property.FlexDirection | CSS.Property.FlexDirection[];
  flexGrow?: number | number[];
  flexShrink?: number | number[];
  flexWrap?: CSS.Property.FlexWrap | CSS.Property.FlexWrap[];
  justifyContent?: CSS.Property.JustifyContent | CSS.Property.JustifyContent[];
  justifyItems?: CSS.Property.JustifyItems | CSS.Property.JustifyItems[];
  justifySelf?: CSS.Property.JustifySelf | CSS.Property.JustifySelf[];
  order?: number | number[];
}

export const Flex = styled(Box)<Props>`
  display: flex;
  ${flexbox}
`;
