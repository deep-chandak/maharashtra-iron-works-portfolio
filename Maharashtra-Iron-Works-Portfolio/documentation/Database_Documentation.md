# Database Documentation

## Purpose
The MySQL scripts support database setup, data validation, and inventory/transaction analysis.

## SQL scripts
| File | Purpose |
|---|---|
| `01_create_database_tables.sql` | Create the database and tables |
| `02_transaction_validation.sql` | Validate transaction records |
| `03_data_quality_summary.sql` | Summarize data-quality checks |
| `04_transaction_date_range.sql` | Inspect transaction date coverage |
| `05_product_count.sql` | Count products |
| `06_show_tables.sql` | List database tables |
| `07_category_transaction_analysis.sql` | Analyze transactions by category |
| `08_category_stock_movement.sql` | Analyze stock movement by category |
| `09_low_stock_products.sql` | List products at or below the query's low-stock threshold |

## Important schema check
Before running SQL scripts, compare actual table and column names in each query with the CSV headers and schema created by `01_create_database_tables.sql`. Do not assume names match without checking.

## Low-stock definition
The `09_low_stock_products.sql` query uses a fixed threshold of `current_stock <= 10` according to project notes. The Power BI Stock Risk page may use product-specific reorder levels, so the two definitions are not necessarily identical.

## Data quality and interpretation
The transaction data is simulated for demonstration. Results demonstrate SQL skills and dashboard preparation, but are not verified company transaction history.
