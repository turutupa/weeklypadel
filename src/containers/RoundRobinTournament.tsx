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

function RoundRobinTournament() {
  const [playerName, setPlayerName] = React.useState<string>('');
  const [tournamentName, setTournamentName] = React.useState<string>('');
  const [existsTournament, setExistsTournament] = React.useState<boolean>(
    false
  );
  const [tournament, setTournament] = React.useState<Tournament | null>(null);
  const [schedule, setSchedule] = React.useState<Match[][] | null>(null);

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
                return (
                  <MatchCard key={local[0].name + ' ' + local[1].name}>
                    {local[0].name} & {local[1].name}
                    <p style={{ fontWeight: 'bold' }}>VS</p>
                    {visitor[0].name} & {visitor[1].name}
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

      {existsTournament && <Ul>{renderPlayers()}</Ul>}

      <br />
      <button
        onClick={() => {
          tournament?.createRoundRobinLeague();
          if (tournament?.schedule) {
            setSchedule(tournament?.schedule);
          }
        }}
      >
        Generate Tournament!
      </button>

      {renderSchedule()}
    </div>
  );
}

export default RoundRobinTournament;
