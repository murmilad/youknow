--DROP DATABASE youknow;

--CREATE DATABASE youknow;

CREATE TABLE know_type (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    style varchar(255)
);

CREATE TABLE know (
    id SERIAL PRIMARY KEY,
    know_type_id INTEGER NOT NULL REFERENCES know_type(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    know_id INTEGER REFERENCES know(id),
    correct BOOLEAN,
    answer_time TIMESTAMP,
    show_time TIMESTAMP NOT NULL
);
