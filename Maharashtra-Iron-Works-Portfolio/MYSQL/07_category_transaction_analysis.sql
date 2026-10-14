
SELECT
    p.category,
    t.transaction_type,
    COUNT(*) AS transaction_count,
    SUM(t.quantity) AS total_quantity
FROM transactions t
JOIN product_master p
    ON t.product_id = p.product_id
GROUP BY
    p.category,
    t.transaction_type
ORDER BY
    p.category,
    t.transaction_type;
