UPDATE rankings
SET mainImage = $1
WHERE weekid = $2
AND year = $3;
