INSERT INTO temp
SELECT * FROM rankings
WHERE weekid=$1
AND year=$2;
