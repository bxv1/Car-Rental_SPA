CREATE DATABASE car_rental;
USE car_rental;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(150) UNIQUE,
password VARCHAR(255),
phone VARCHAR(20),
role ENUM('admin','user') DEFAULT 'user',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars (
id INT AUTO_INCREMENT PRIMARY KEY,
brand VARCHAR(100),
model VARCHAR(100),
year INT,
price_per_day DECIMAL(10,2),
status ENUM('available','rented','maintenance') DEFAULT 'available',
image VARCHAR(255),
description TEXT
);

CREATE TABLE bookings (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
car_id INT,
pickup_date DATE,
return_date DATE,
total_price DECIMAL(10,2),
status ENUM('pending','approved','cancelled','completed') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES users(id),
FOREIGN KEY(car_id) REFERENCES cars(id)
);