SELECT id,full_name,email,profile_pic,created_at,updated_at
FROM users
WHERE id <> $1;