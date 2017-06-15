DO $$
BEGIN
	FOR counter IN 1..10 LOOP
	INSERT INTO projects (id, title, description, img)
		VALUES (counter, 'placeholder', 'placeholder', 'placeholderimage');
	END LOOP;
END; $$
