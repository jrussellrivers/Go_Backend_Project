create table users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE not null,
    password VARCHAR not null
);