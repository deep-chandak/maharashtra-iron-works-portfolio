
SELECT
    MIN(transaction_timestamp) AS first_transaction,
    MAX(transaction_timestamp) AS last_transaction,
    COUNT(DISTINCT DATE(transaction_timestamp)) AS active_days
FROM transactions;
