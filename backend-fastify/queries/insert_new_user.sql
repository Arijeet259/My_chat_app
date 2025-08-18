INSERT INTO users (email, full_name, password, created_at)
VALUES ($1,$2,$3,$4) RETURNING * ;