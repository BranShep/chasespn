SELECT teams.name, rankings.record, teams.image, rankings.ranking, teams.teamID, rankings.previous_ranking, rankings.description, rankings.year, rankings.weekID, rankings.position, rankings.title, rankings.mainimage, rankings.date
FROM teams
INNER JOIN temp
ON teams.teamID=temp.teamID
WHERE temp.weekID=$1
AND temp.year=$2
ORDER BY cast(ranking as int) ASC;
