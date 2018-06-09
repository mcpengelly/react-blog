# Run scripts with
> psql -U {user} -f server/db/scripts/{script}

ex:
> psql -U matthewpengelly -f server/db/scripts/remake-db.sql

# samples
> INSERT INTO posts (id, title, content) VALUES ('Placeholder Title', 'placeholder', 'placeholder');

> INSERT INTO projects (id, title, description, img) VALUES ('counter', 'placeholder', 'placeholder', 'placeholderimage');
