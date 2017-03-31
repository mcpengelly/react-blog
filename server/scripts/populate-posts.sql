DO $$
BEGIN
	FOR counter IN 1..10 LOOP
	INSERT INTO posts (id, title, content, shortcontent)
		VALUES (counter, 'placeholder', 'placeholder', 'place...');
	END LOOP;
END; $$

