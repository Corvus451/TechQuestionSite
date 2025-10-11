DROP TABLE IF EXISTS users;

CREATE TABLE users (
user_id serial PRIMARY KEY,
username varchar(15) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
admin boolean DEFAULT false,
created_at timestamp DEFAULT CURRENT_TIMESTAMP
);