DO $$
BEGIN
	FOR counter IN 1..10 LOOP
	INSERT INTO posts (id, title, content)
		VALUES (counter, 'placeholder', 'placeholder');
	END LOOP;
END; $$

