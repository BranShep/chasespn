-- SELECT * FROM teams
-- ORDER BY name ASC;

SELECT MAX(weekid) FROM rankings WHERE year=$1;
