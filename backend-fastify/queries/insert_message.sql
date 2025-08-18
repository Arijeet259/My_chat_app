INSERT INTO messages(
	sender_id, receiver_id, text, image)
	VALUES ($1, $2, $3, $4) RETURNING * ;