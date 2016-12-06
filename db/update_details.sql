UPDATE rankings
SET description=$1
WHERE teamid=$2
AND weekid=$3
AND year=$4;
