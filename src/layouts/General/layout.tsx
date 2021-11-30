import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer, FOOTER_HEIGHT } from '../../components/Footer';
import { Header } from '../../components/Header';

type Props = {
  darkMode: boolean;
};

const Background = styled.div<Props>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.darkMode ? '#000' : '#fff'};
`;

const Column = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
`;

const Content = styled.div`
  min-height: calc(100vh - ${FOOTER_HEIGHT});
`;

export const GeneralLayout = ({darkMode}: Props) => (
  <Background darkMode={darkMode}>
    <Column>
      <Content>
        <Header />
        <Outlet />
      </Content>
      <Footer />
    </Column>
  </Background>  
);
