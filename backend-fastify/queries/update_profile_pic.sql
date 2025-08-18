UPDATE users
SET profile_pic = $1
WHERE id = $2
RETURNING *;