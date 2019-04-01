-- "ov8uu7vikyzvwwiv" is the Heroku deployed db.  
-- When using local testing you can just use the "schema-local.sql" to configure
DROP DATABASE IF EXISTS ov8uu7vikyzvwwiv;
CREATE DATABASE ov8uu7vikyzvwwiv;
USE ov8uu7vikyzvwwiv;

-- Don't want to define this here. This definition is in the model files

-- CREATE TABLE users (
--     id int,
--     username varchar(255),
--     password varchar(255),
--     currentScore int,
--     highScore int,
--     currentStress int,
--     highStress int,
--     currentQuestionId int
-- );
