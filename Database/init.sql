DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS answers;

CREATE TABLE users (
user_id serial PRIMARY KEY,
username varchar(15) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
admin boolean DEFAULT false
);

CREATE TABLE questions (
question_id serial PRIMARY KEY,
owner_id integer NOT NULL,
created_at timestamp DEFAULT CURRENT_TIMESTAMP,
title varchar(255) NOT NULL,
details text,
solved boolean DEFAULT false,
upvotes integer DEFAULT 0,
FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  question_id integer NOT NULL,
  owner_id integer NOT NULL,
  content text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  upvotes integer DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);