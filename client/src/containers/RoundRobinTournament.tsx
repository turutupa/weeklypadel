import React, { KeyboardEvent } from 'react';
import { Tournament, Player } from '../tournament';

interface Keyboard extends KeyboardEvent {
  code: string;
}

function RoundRobinTournament() {
  const [playerName, setPlayerName] = React.useState<string>('');
  const [tournamentName, setTournamentName] = React.useState<string>('');
  const [existsTournament, setExistsTournament] = React.useState<boolean>(
    false
  );
  const [tournament, setTournament] = React.useState<Tournament | null>(null);

  React.useEffect(() => {
    console.log(tournament);
  }, []);

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

  return (
    <div>
      <h1>Round Robin</h1>
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
          />
        </form>
      )}

      {existsTournament && renderPlayers()}
    </div>
  );
}

export default RoundRobinTournament;
