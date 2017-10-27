DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
	id text,
	title text,
	description text,
	img text
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id text,
	title text,
	content text
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	username text,
	password text
);

DROP TABLE IF EXISTS subscribers;

CREATE TABLE subscribers (
	id text,
	email text,
	active boolean
);


# INSERT INTO posts (id, title, content) VALUES ('Placeholder Title', 'placeholder', 'placeholder');

# INSERT INTO projects (id, title, description, img) VALUES ('counter', 'placeholder', 'placeholder', 'placeholderimage');
