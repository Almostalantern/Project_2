DROP DATABASE IF EXISTS states_db;

CREATE DATABASE states_db;

USE states_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar (50) NOT NULL,
	password varchar (50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE states
(
    id int NOT NULL AUTO_INCREMENT,
	state_name varchar(50) NOT NULL,
	visited BOOLEAN DEFAULT false,
	PRIMARY KEY (id)

);

