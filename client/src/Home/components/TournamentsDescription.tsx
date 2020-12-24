import React from 'react';
import styled from 'styled-components';

import { H2 } from 'Headers';
import { dark, blueNeon, yellowNeon } from 'utils/colors';
import InfoCard from './InfoCard';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${dark};
  text-align: center;
  position: relative;
  box-sizing: border-box;
  margin-top: 100px;
  margin-bottom: 150px;

  @media (min-width: 768px) {
    margin-top: 150px;
    margin-bottom: 200px;
  }
`;

const Container = styled.div`
  max-width: 1300px;
`;

const Header = styled(H2)`
  color: white;
  padding: 0 20px;
  background-color: ${dark};
  font-size: 48px;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    padding: 20px 40px;
    margin-bottom: 100px;
    margin-top: 50px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TitleRR = styled.h2`
  font-family: RealNeon;
  ${blueNeon};
`;

const TitleBrackets = styled.h2`
  font-family: RealNeon;
  ${yellowNeon};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5%;
`;

const P = styled.p`
  color: white;
  text-align: left;
  font-family: Neon;
  width: 100%;
`;

const NeonSpanRR = styled.span`
  ${blueNeon}
  margin-right: 10px;
  margin-bottom: 5px;
  font-family: RealNeon;
`;

const NeonSpanBrackets = styled.span`
  ${yellowNeon};
  margin-right: 10px;
  margin-bottom: 5px;
  font-family: RealNeon;
`;

export default function Info() {
  return (
    <Wrapper>
      <Container>
        <Header>Choose the tournament that best fits your needs</Header>
        <CardsWrapper>
          <InfoCard>
            <Body>
              <TitleRR>Round Robin</TitleRR>
              <P>
                Round robin is a tournament in which each competitor plays in
                turn against every other. In <strong>weeklypadel</strong> we
                offer two types of round robin.
              </P>
              <P>
                <NeonSpanRR>Free-for-all!</NeonSpanRR> Play against every single
                participant, in each game you'll rotate partner. Most fun and
                suitable for tournaments with similar skill level and with a
                number of players proportional to 4.
              </P>
              <P>
                <NeonSpanRR>Classic Round Robin!</NeonSpanRR> In this mode you
                select your partner and you play once against each other team.
                Choose your brother-in-arms and make it to the top of the hill!
              </P>
            </Body>
          </InfoCard>

          <InfoCard>
            <Body>
              <TitleBrackets>Brackets Tournament</TitleBrackets>
              <P>
                Welcome to the old time classic{' '}
                <strong>Brackets Tournament</strong>, where only the most
                talented team will outlast. <strong>Brackets tournament</strong>{' '}
                only offers one mode!
              </P>
              <P>
                <NeonSpanBrackets>King of the hill</NeonSpanBrackets> you know
                the drill, single-elimination tournament a.k.a.{' '}
                <strong>SUDDEN DEATH TOURNAMENT</strong>. Each game will result
                in a winner and a loser team, the former will continue to the
                next round whereas the latter... well, you know.
              </P>
            </Body>
          </InfoCard>
        </CardsWrapper>
      </Container>
    </Wrapper>
  );
}
