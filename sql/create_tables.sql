CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  street varchar(100) NOT NULL,
  city varchar(50) NOT NULL,
  state varchar(20) NOT NULL,
  zip INT NOT NULL
);



INSERT INTO users (name, password, email, street, city, state, zip) 
VALUES 
('hari', 'password', 'hari@example.com', '1223 Main St', 'Harrisburg', 'PA', '17109'),
 ('john', 'password', 'john@example.com', '3211 Main St', 'Harrisburg', 'PA', '17109');


CREATE TABLE IF NOT EXISTS items (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(6,2) NOT NULL
    quantity NUMERIC(6) NOT NULL
);

