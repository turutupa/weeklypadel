import React from 'react';
import { Tournament, Player, Match } from '../tournament';
import styled from 'styled-components';

const MatchCard = styled.div`
  padding: 15px;
  border-radius: 6px;
  background-color: #f3f3f3;
  margin-bottom: 10px;
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
      return <li key={player.name}>{player.name}</li>;
    });
  };

  const renderSchedule = function () {
    if (tournament && schedule) {
      return schedule.map((round, roundNumber) => {
        roundNumber = roundNumber + 1;

        return (
          <div key={`round-${roundNumber}`}>
            <h1 style={{ fontWeight: 'bold' }}>Round {roundNumber}</h1>
            {round.map((match) => {
              const { local, visitor } = match.getTeams();
              return (
                <MatchCard key={local[0].name + ' ' + local[1].name}>
                  Local: {local[0].name} & {local[1].name}
                  <br />
                  Visitor: {visitor[0].name} & {visitor[1].name}
                  <br />
                </MatchCard>
              );
            })}
          </div>
        );
      });
    }
  };

  return (
    <div>
      <h1>Round Robin {tournament?.name}</h1>

      {!existsTournament && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTournament(Tournament.named(tournamentName));
            setTournamentName('');
            setExistsTournament(true);
          }}
        >
          <label>Tournament name</label>
          <input
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
          <label>Player name</label>
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            type='text'
            autoFocus
          />
        </form>
      )}

      {existsTournament && renderPlayers()}

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
