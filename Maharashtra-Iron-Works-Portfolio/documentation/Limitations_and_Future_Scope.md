# Limitations and Future Scope

## Current limitations
- Analytics CSVs contain simulated/demo data rather than verified business records.
- The Python script's expected input filename and output paths should be checked before rerunning it.
- MySQL queries must be checked against actual table and column names before execution.
- The SQL low-stock query uses a fixed threshold of 10, while Power BI Stock Risk may use product-specific reorder levels.
- Do not assume website/Google Sheets, MySQL, Python, and Power BI synchronize live unless that integration has been built and tested.
- Deployment and access settings depend on the owner's Google and local database configuration.

## Future improvements
- Add input validation, clear success/error messages, and audit logging to stock updates.
- Add authentication and role-based access for admin functions.
- Use a consistent product ID across the website, spreadsheet, SQL database, and Power BI model.
- Document a repeatable data import/refresh process.
- Align the low-stock rule across SQL and Power BI.
- Add automated tests for stock-in/stock-out operations and data validation.
- Replace simulated data with approved, non-sensitive real data if used operationally.
- Add a data dictionary documenting each field, its type, and meaning.
