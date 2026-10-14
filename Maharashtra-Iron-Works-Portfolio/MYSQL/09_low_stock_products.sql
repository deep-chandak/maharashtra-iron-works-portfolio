
USE maharashtra_iron_works;

SELECT
    product_id,
    product_name,
    category,
    current_stock
FROM product_master
WHERE current_stock <= 10
ORDER BY current_stock ASC;
