import React from 'react';
import { Tournament, Player, Match } from '../tournament';
import styled from 'styled-components';

const MatchCard = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  margin: 0 10px;
  background-color: rgb(110, 156, 225, 0.3);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px 50px;
`;

const Round = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Li = styled.li`
  text-decoration: none !important;
  color: rgb(60, 107, 177);
`;

const Ul = styled.ul`
  columns: 2;
  list-style: none;
`;

const Subtle = styled.span`
  color: grey;
  font-size: 18px;
`;

function RoundRobinTournament() {
  const [playerName, setPlayerName] = React.useState<string>('');
  const [tournamentName, setTournamentName] = React.useState<string>('');
  const [existsTournament, setExistsTournament] = React.useState<boolean>(
    false
  );
  const [tournament, setTournament] = React.useState<Tournament>(null!);
  const [schedule, setSchedule] = React.useState<Match[][]>(null!);
  const [numberOfPlayers, setNumberOfPlayers] = React.useState<number>(0);

  const renderPlayers = function () {
    const players: Player[] = [];
    if (tournament) {
      for (let [_, player] of tournament.getPlayers()) {
        players.push(player);
      }
    }

    return players.map((player) => {
      return <Li key={player.name}>{player.name}</Li>;
    });
  };

  const renderSchedule = function () {
    if (tournament && schedule) {
      return schedule.map((round, roundNumber) => {
        roundNumber = roundNumber + 1;

        return (
          <div key={`round-${roundNumber}`}>
            <h1 style={{ fontWeight: 'bold' }}>Round {roundNumber}</h1>
            <Round>
              {round.map((match) => {
                const { local, visitor } = match.getTeams();

                const firstLocal = local[0].name;
                const secondLocal = local[1].name;
                const firstVisitor = visitor[0].name;
                const secondVisitor = visitor[1].name;

                return (
                  <MatchCard
                    key={`${firstLocal} ${secondLocal} ${firstVisitor} ${secondVisitor}`}
                  >
                    {firstLocal} <Subtle>&</Subtle> {secondLocal}
                    <p style={{ fontWeight: 'bold' }}>VS</p>
                    {firstVisitor} <Subtle>&</Subtle> {secondVisitor}
                  </MatchCard>
                );
              })}
            </Round>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <h1> {tournament?.name || 'Tournament Generator'}</h1>

      {/* <button
        onClick={() => {
          const t = Tournament.named('Padeliers');
          t?.addPlayer('1');
          t?.addPlayer('2');
          t?.addPlayer('3');
          t?.addPlayer('4');
          t?.addPlayer('5');
          t?.addPlayer('6');
          t?.addPlayer('7');
          t?.addPlayer('8');
          t?.addPlayer('9');
          t?.addPlayer('10');
          t?.addPlayer('11');
          t?.addPlayer('12');
          setExistsTournament(true);
          t.createRoundRobinLeague();
          setTournament(t);
        }}
      >
        Auto-generate
      </button> */}

      {!existsTournament && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTournament(Tournament.named(tournamentName));
            setTournamentName('');
            setExistsTournament(true);
          }}
        >
          <Label>Tournament name</Label>
          <Input
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            type='text'
            autoFocus
          />
        </form>
      )}
      {existsTournament && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tournament?.addPlayer(playerName);
            setPlayerName('');
            setNumberOfPlayers(numberOfPlayers + 1);
          }}
        >
          <Label>Player name</Label>
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            type='text'
            autoFocus
          />
        </form>
      )}

      {existsTournament && (
        <>
          <h3>Players #{numberOfPlayers}</h3>
          <Ul>{renderPlayers()}</Ul>
        </>
      )}

      <br />
      {existsTournament &&
        tournament?.getPlayersNames() &&
        tournament?.getPlayersNames().length > 0 && (
          // tournament?.getPlayersNames().length % 4 === 0 &&
          // tournament?.getPlayersNames().length < 12 &&
          <>
            <button
              onClick={() => {
                try {
                  const schedule = tournament?.createRoundRobinLeague();
                  setSchedule(schedule);
                } catch (e) {
                  console.log('Oops! There has been an error!');
                }
              }}
            >
              Generate Tournament!
            </button>
            <p style={{ color: 'grey' }}>
              <i>
                Enter Tournament Name and some <br /> Players before generating
                tournament
              </i>
            </p>
          </>
        )}

      {renderSchedule()}
    </div>
  );
}

export default RoundRobinTournament;
