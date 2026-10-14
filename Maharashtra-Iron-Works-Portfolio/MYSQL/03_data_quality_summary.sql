
SELECT
    SUM(quantity IS NULL) AS missing_quantities,
    SUM(quantity <= 0) AS non_positive_quantities,
    SUM(transaction_type IS NULL) AS missing_types,
    SUM(
        transaction_type NOT IN ('IN', 'OUT')
    ) AS invalid_types
FROM transactions;
