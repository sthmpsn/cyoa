--  "cyoa" is the local db (not Heroku deployed).
-- Use the "schema-heroku.sql" for configuring the deployed version
DROP DATABASE IF EXISTS cyoa;
CREATE DATABASE cyoa;
USE cyoa;

-- Don't want to define this here. This definition is in the model files

-- CREATE TABLE users (
--     id int,
--     username varchar(255),
--     password varchar(255),
--     currentScore int,
--     finalScore int,
--     currentStress int,
--     finalStress int,
--     currentQuestionId int
-- );
