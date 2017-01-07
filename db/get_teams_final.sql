SELECT teams.name, temp.record, teams.image, temp.ranking, teams.teamID, temp.previous_ranking, temp.description, temp.year, temp.weekID, temp.position, temp.title, temp.mainimage, temp.date
FROM teams
INNER JOIN temp
ON teams.teamID=temp.teamID
WHERE temp.weekID=$1
AND temp.year=$2
ORDER BY cast(ranking as int) ASC;
