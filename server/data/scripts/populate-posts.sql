DO $$
BEGIN
	FOR counter IN 1..10 LOOP
	INSERT INTO projects (id, title, body, shortbody)
		VALUES (counter, 'placeholder', 'placeholder', 'place...');
	END LOOP;
END; $$

