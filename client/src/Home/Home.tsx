import React from 'react';

import {
  SiteDescription,
  CreateTournamentNeon,
  TournamentsDescription,
} from './components';

import backgrounds from './backgroundImages';

import Title from 'Title';

import styled from 'styled-components';

const Wrapper = styled.div`
  // margin-top: 60px;
  min-height: calc(100vh) !important;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(' ${({ bg }: { bg: string }) => bg}');
  background-size: cover;
  background-position: center;
`;

export default function Welcome() {
  const [bg, setBg] = React.useState<string>(backgrounds[0]);
  const [counter, setCounter] = React.useState<number>(0);

  React.useEffect(() => {
    const bgLoop = setTimeout(() => {
      const c = counter + 1 >= backgrounds.length ? 0 : counter + 1;
      setCounter(c);
      setBg(backgrounds[c]);
    }, 10000);

    return () => {
      clearTimeout(bgLoop);
    };
  }, [bg]);

  return (
    <>
      <Wrapper bg={bg}>
        <Title />
        <CreateTournamentNeon />
        <SiteDescription />
      </Wrapper>
      <TournamentsDescription />
    </>
  );
}
