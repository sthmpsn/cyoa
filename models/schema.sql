DROP DATABASE IF EXISTS cyoa;
CREATE DATABASE cyoa;
USE cyoa;

CREATE TABLE users (
    ID int,
    username varchar(255),
    password varchar(255),
    score int,
    stress int,
    currentQuestionId int, 
)
