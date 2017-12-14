CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
	id uuid DEFAULT uuid_generate_v4 (),
	title text,
	description text,
	img text,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id uuid DEFAULT uuid_generate_v4 (),
	title text,
	content text,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS subscribers;

CREATE TABLE subscribers (
	id uuid DEFAULT uuid_generate_v4 (),
	email text,
	active boolean,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	username text,
	password text
);

# INSERT INTO posts (id, title, content) VALUES ('Placeholder Title', 'placeholder', 'placeholder');

# INSERT INTO projects (id, title, description, img) VALUES ('counter', 'placeholder', 'placeholder', 'placeholderimage');