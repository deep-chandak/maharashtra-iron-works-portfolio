
SELECT *
FROM transactions
WHERE quantity IS NULL
   OR quantity <= 0
   OR transaction_type IS NULL
   OR transaction_type NOT IN ('IN', 'OUT');
