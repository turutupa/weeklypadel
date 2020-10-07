let teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const roundRobin = (teams, counter = 0) => {
  let schedule = [];
  let league = teams.slice();
  if (counter === 1) {
    console.log(teams);
    return teams;
  }

  if (league.length % 2) {
    league.push('None');
  }

  let rounds = league.length;

  for (let j = 0; j < (rounds - 1) * 2; j++) {
    schedule[j] = [];
    for (let i = 0; i < rounds / 2; i++) {
      if (league[i] !== 'None' && league[rounds - 1 - i] !== 'None') {
        if (j % 2 == 1) {
          schedule[j].push([league[i], league[rounds - 1 - i]]);
        } else {
          schedule[j].push([league[rounds - 1 - i], league[i]]);
        }
      }
    }
    league.splice(1, 0, league.pop());
  }
  if (counter === 1) return schedule;
  return roundRobin(schedule, 1);
};

let leagueSchedule = roundRobin(teams);

for (let p = 0; p < leagueSchedule.length; p++) {
  console.log(`ROUND ${p}:`, JSON.stringify(leagueSchedule[p]));
}
