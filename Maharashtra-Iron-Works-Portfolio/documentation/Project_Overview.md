# Maharashtra Iron Works — Inventory Management & Analytics

## Project overview
This project demonstrates an inventory-management workflow for Maharashtra Iron Works. It combines a Google Apps Script web app, Google Sheets inventory data, a Python data-generation workflow, MySQL validation/analysis queries, and a Power BI dashboard.

## Main components
- **Website:** `Code.gs`, `Index.html`, and `Admin.html` in `Website/`.
- **Inventory data:** Google Sheets used by the Apps Script application.
- **Python:** `make_simulated_data.py` and CSV files in `Python/`.
- **MySQL:** SQL scripts in `MySQL/` for table creation, validation, and analysis.
- **Power BI:** `.pbix` dashboard and screenshots in `PowerBI/` and `Screenshots/`.

## Website features
- Inventory/product pages and QR-oriented product access.
- Admin inventory view.
- Stock add/remove workflow.
- Google Sheets used as the website's data store.

Confirm each feature in the deployed version before describing it as production-ready.

## Power BI pages
1. Inventory Overview
2. Monthly Trends
3. Product Analysis
4. Stock Risk
5. Sales & Revenue Analysis

## Data note
The Python workflow created simulated data for demonstration and analytics. Project notes indicate 300 products and 1,296 simulated transactions covering May 1 to October 5, 2026. These are sample figures, not verified real business records.

## Technology stack
Google Apps Script, HTML, CSS, JavaScript, Google Sheets, Python (pandas/numpy), MySQL, Power BI, and DAX.

## Important limitation
Do not claim that Google Sheets, MySQL, Python, and Power BI all synchronize live unless that integration has been implemented and tested. Describe the components as a combined project workflow/demo where appropriate.
