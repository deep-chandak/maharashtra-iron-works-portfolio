CREATE DATABASE maharashtra_iron_works;
USE maharashtra_iron_works;
CREATE TABLE product_master (
    product_id VARCHAR(20) PRIMARY KEY,
    product_code VARCHAR(30),
    product_name VARCHAR(150),
    brand VARCHAR(100),
    category VARCHAR(100),
    material VARCHAR(100),
    size VARCHAR(100),
    rack VARCHAR(50),
    selling_price DECIMAL(10,2),
    current_stock INT,
    cost_price DECIMAL(10,2),
    reorder_level INT
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_timestamp DATETIME,
    product_id VARCHAR(20),
    product_name VARCHAR(150),
    transaction_type VARCHAR(10),
    quantity INT,
    staff VARCHAR(100),
    source VARCHAR(30),
    FOREIGN KEY (product_id)
        REFERENCES product_master(product_id)
);
