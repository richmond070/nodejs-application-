CREATE DATABASE eddy;

--\c eddy

CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR (250),
    user_name VARCHAR(100),
    email VARCHAR (150),
    address VARCHAR(300),
    phone_number VARCHAR(50),
    password VARCHAR(150)
);