DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
	id character varying,
	title character varying,
	description character varying,
	img character varying
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id character varying,
	title character varying,
	content character varying
);
