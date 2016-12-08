SELECT teams.name, rankings.record, teams.image, rankings.ranking, teams.teamID, rankings.previous_ranking, rankings.description, rankings.year, rankings.weekID, rankings.position, rankings.title, rankings.mainimage
FROM teams
INNER JOIN rankings
ON teams.teamID=rankings.teamID
WHERE rankings.weekID=$1
AND rankings.year=$2
ORDER BY cast(ranking as int) ASC;
