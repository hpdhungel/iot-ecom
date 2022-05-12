CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  street varchar(100) NOT NULL,
  city varchar(50) NOT NULL,
  state varchar(20) NOT NULL,
  zip INT NOT NULL,
  user_role BOOLEAN 
);



INSERT INTO users (name, password, email, street, city, state, zip) 
VALUES 
('hari', 'password', 'hari@example.com', '1223 Main St', 'Harrisburg', 'PA', '17109'),
 ('john', 'password', 'john@example.com', '3211 Main St', 'Harrisburg', 'PA', '17109');


CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR(255),
    price NUMERIC(8) NOT NULL,
    quantity NUMERIC(6) NOT NULL,
    img_url varchar NOT NULL DEFAULT 'https://lahousing.lacity.org/AAHR/Images/No_Image_Available.jpg'
);

INSERT INTO products (name, description, price, quantity) 
VALUES 
('Inspiron 15 Laptop', 'The latest 11th Generation Intel® Core™ processors deliver incredible', 10.00, 10),
('Macbook 16"', 'The latest 11th Generation Intel® Core™ processors deliver incredible', 10.00, 10)

 CREATE TABLE IF NOT EXISTS cart (
  cart_id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(user_id)  NOT NULL,
  product_id integer REFERENCES products(product_id) NOT NULL,
  quantity integer  NOT NULL
);

CREATE TABLE IF NOT EXISTS transaction (
  transaction_id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(user_id),
  subtotal integer,
  tax integer,
  total integer,
  products jsonb
);



docker run -p 5050:80 -e "PGADMIN_DEFAULT_EMAIL=hpdhungel@gmail.com" -e "PGADMIN_DEFAULT_PASSWORD=password" -d  dpage/pgadmin4