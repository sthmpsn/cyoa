--  "cyoa" is the local db (not Heroku deployed).
-- Use the "schema-heroku.sql" for configuring the deployed version
DROP DATABASE IF EXISTS cyoa;
CREATE DATABASE cyoa;
USE cyoa;

CREATE TABLE users (
    id int,
    username varchar(255),
    password varchar(255),
    score int,
    stress int,
    currentQuestionId int
);
