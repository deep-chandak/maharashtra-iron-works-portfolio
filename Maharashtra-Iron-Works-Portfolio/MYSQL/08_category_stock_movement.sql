
SELECT
    p.category,
    SUM(
        CASE
            WHEN t.transaction_type = 'IN'
            THEN t.quantity ELSE 0
        END
    ) AS stock_in_quantity,
    SUM(
        CASE
            WHEN t.transaction_type = 'OUT'
            THEN t.quantity ELSE 0
        END
    ) AS stock_out_quantity,
    COUNT(*) AS total_transactions
FROM transactions t
JOIN product_master p
    ON t.product_id = p.product_id
GROUP BY p.category
ORDER BY p.category;
