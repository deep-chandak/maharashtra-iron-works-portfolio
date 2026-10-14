# Maharashtra Iron Works — Inventory Management & Analytics

A portfolio project combining a QR-based inventory management website, Google Sheets, Python-generated transaction data, MySQL/SQL analysis, and a five-page Power BI dashboard.

The project addresses two business needs:

- **Inventory management:** make product information and stock updates easier than paper-based recordkeeping.
- **Inventory analytics:** analyse stock movements, product performance, stock risk, and estimated revenue through Power BI.

> **Data transparency:** The transaction history was generated using Python for analytical purposes. Some analytical fields, such as cost prices and reorder levels, may be simulated. Findings based on simulated data are illustrative and should not be treated as verified historical business performance.

---

## Contents

1. Business Problem
2. Project Objectives
3. Solution Overview
4. QR-Based Inventory Website
5. Google Sheets Inventory Data
6. Python Transaction Data Generation
7. MySQL and SQL Analysis
8. Power BI Dashboard
9. Key Metrics and Findings
10. Technology Stack
11. Project Structure
12. How to Explore the Project
13. Data Notes and Limitations
14. Future Improvements
15. Author

---

## 1. Business Problem

Maharashtra Iron Works handles a range of hardware and iron-work products, including fasteners, tools, electrical items, welding supplies, and other stock.

Traditional paper-based stock tracking can create several challenges:

- Checking product availability can take time.
- Stock records may not always match the physical quantity on the shelf.
- Recording incoming and sold stock manually requires effort.
- Workers may need to search for product prices, codes, and rack locations.
- Without organised transaction history, it is difficult to analyse fast-moving products and stock movement over time.

This project explores a digital inventory workflow alongside a separate analytics solution for understanding stock movement and business performance.

## 2. Project Objectives

- Provide quick access to product information through QR codes.
- Make product and stock information easier for workers to access.
- Provide a PIN-protected admin page for managing inventory.
- Use Google Sheets as the website's inventory data source.
- Generate transaction records using Python for analytical purposes.
- Use MySQL and SQL to work with structured data and perform queries.
- Build an interactive Power BI dashboard for inventory and revenue analysis.
- Document the technology, workflow, results, and data limitations.

## 3. Solution Overview

The project consists of two related components.

### A. Operational inventory system

**QR code → Google Apps Script website → Google Sheets**

Workers can scan a product QR code to view product details and use the available stock actions. An administrator can access a separate PIN-protected page to browse products and manage stock.

Inventory changes made through the website are reflected in the connected Google Sheets data.

### B. Analytics workflow

**Product data + Python-generated transactions → MySQL/SQL analysis → Power BI**

Python was used to generate transaction records for analysis. Data was also imported into or worked with in MySQL, where SQL queries were used to inspect and analyse structured data before reporting in Power BI.

These are related parts of the project, but they should not be interpreted as one fully automated, real-time pipeline. The Python-generated transaction history is analytical data; automatic synchronisation between the website, MySQL, and Power BI is not claimed.

## 4. QR-Based Inventory Website

The website was developed using **Google Apps Script**, with HTML, CSS, and JavaScript for the web interface. Google Sheets serves as the inventory data source.

### 4.1 Worker-facing QR product page

Each product can be accessed through its QR code. Workers can scan the code using a phone and open the corresponding product page.

The page displays product information such as:

- Product name and product code
- Product image
- Brand and category
- Material and size
- Selling price
- Current stock and availability
- Rack location, where available

The page also provides stock actions for recording additions and sold or removed quantities, according to the website's implemented functionality.

### 4.2 PIN-protected admin inventory page

The website includes a separate admin page protected by a PIN. It provides a product-card interface for browsing and managing inventory.

Features include:

- PIN-protected admin access
- Product browsing and product information
- Stock quantity and availability display
- Add-stock and remove-stock actions
- Access to product QR codes
- Inventory changes reflected in the connected Google Sheets data

### 4.3 Business benefits

The website aims to reduce dependence on handwritten stock registers, make product information easier to find, and simplify the recording of stock additions and removals.

**Security note:** Never publish the admin PIN, private deployment URLs, credentials, or other sensitive information in the repository or screenshots.

## 5. Google Sheets Inventory Data

Google Sheets serves as the inventory data source connected to the Apps Script website.

The product information used in the project includes fields such as:

- Product ID or product code
- Product name
- Brand and category
- Material and size
- Selling price
- Current stock
- Reorder level, where included in the analytical dataset

When stock is changed through the website, the corresponding inventory data is updated in Google Sheets. This provides a shared operational inventory record for the website and spreadsheet.

The analytical dataset and generated transaction history should be treated separately from the operational inventory unless a specific import or integration has been configured.

## 6. Python Transaction Data Generation

Python was used to generate transaction records for inventory analytics. This provided a dataset for database querying and Power BI reporting without presenting the generated history as verified real sales.

The analytical dataset contains **1,296 simulated stock-in and stock-out transactions across 300 products**, covering May to early October 2026.

The data-generation process includes:

- Generating simulated stock-in and stock-out records.
- Associating transactions with products, dates, quantities, transaction types, and staff names.
- Introducing patterns such as varying product movement and periodic restocking.
- Checking generated transaction history against product stock values.
- Avoiding negative stock quantities in the generated sequence.

If included in the repository, the Python script can be documented as `make_simulated_data.py`. The README and setup instructions should use the actual script path present in the project.

**Important:** These transactions are simulated analytical data, not verified historical sales from Maharashtra Iron Works.

## 7. MySQL and SQL Analysis

MySQL was used as part of the data-analysis workflow before Power BI.

Data from spreadsheet or CSV sources was imported into or worked with in MySQL. SQL queries were used to retrieve, inspect, and analyse structured data.

The database work can be documented under the following activities, where supported by the actual project files:

- Importing data from Excel, CSV, or spreadsheet exports.
- Creating and working with database tables.
- Inspecting product and transaction records.
- Writing SQL queries to filter, sort, group, and summarise data.
- Analysing stock-in and stock-out movements.
- Preparing or validating data for reporting.

**MySQL Workbench** was used to work with the database and execute SQL queries.

If available, include the actual SQL scripts, table definitions, and query screenshots in the repository. The exact schema and queries should be documented from the files you actually used rather than reconstructed from assumptions.

The README does not claim a direct live connection between the website's Google Sheets and MySQL.

## 8. Power BI Dashboard

The Power BI report contains five pages, each designed to analyse a different aspect of inventory and sales-related data.

| Dashboard page | Purpose |
|---|---|
| **Inventory Overview** | Summarises transactions, products, stock units, stock-in versus stock-out, and movement by category. |
| **Monthly Trends** | Compares stock-in and stock-out quantities by month. The final month in the dataset is partial. |
| **Product Analysis** | Shows the top 10 products by stock-out quantity, with a category filter. |
| **Stock Risk** | Compares each product's current stock against its reorder level and displays its stock status. |
| **Sales & Revenue Analysis** | Presents estimated revenue and product/category revenue comparisons. |

### Measures and calculations

The report includes measures for:

- Total transactions
- Total products
- Total stock
- Stock-in quantity
- Stock-out quantity
- Stock movement difference
- Stock-out share
- Estimated total revenue

Revenue is calculated using stock-out quantity multiplied by the product's selling price.

Because the transaction data does not store the selling price at the time of each transaction, this is an estimate based on the available product price.

### Dashboard screenshots

Include screenshots of all five report pages in your `Screenshots/` folder. Update the image paths below to match the actual filenames in your repository.

- Inventory Overview
- Monthly Trends
- Product Analysis
- Stock Risk
- Sales & Revenue Analysis

Example Markdown for displaying a screenshot:

`![Power BI Inventory Overview](Screenshots/01-overview.png)`

## 9. Key Metrics and Findings

The following figures come from the analytical dataset and Power BI report. They should not be interpreted as verified real-world business performance.

| Metric | Reported value |
|---|---:|
| Total transactions | 1,296 |
| Total products | 300 |
| Total stock-out quantity | 4,422 |
| Total stock-in quantity | 3,856 |
| Stock movement difference | -566 |
| Stock-out share of total movement | 53.42% |
| Estimated revenue | Approximately ₹984.75K |

### Key findings

**1. Stock-out exceeds stock-in**

The generated dataset contains 4,422 stock-out units compared with 3,856 stock-in units, resulting in a difference of -566 units.

**2. Units sold and revenue are different measures**

Products with high unit movement do not necessarily generate the highest revenue. Product prices influence the revenue contribution of each category.

**3. Product performance can be analysed from different perspectives**

The Product Analysis page highlights products with high stock-out quantities, while the Sales & Revenue Analysis page helps compare estimated monetary contribution.

**4. Stock risk depends on reorder levels**

The Stock Risk page compares product stock with reorder levels. In the analysed dataset, products were displayed as having sufficient stock at the time of analysis. This result depends on the available stock data and reorder-level assumptions.

### Recommendations

- Review fast-moving products frequently and establish appropriate minimum-stock levels.
- Monitor high-value product categories as well as products with high unit movement.
- Compare stock-in and stock-out trends when planning replenishment.
- Validate simulated assumptions against actual records before making operational decisions.

## 10. Technology Stack

| Technology | Role |
|---|---|
| Google Apps Script | Website logic and integration with Google Sheets |
| Google Sheets | Operational product and inventory data source |
| HTML, CSS, JavaScript | Website interface and interactive functionality |
| QR codes | Quick access to product-specific pages |
| Python | Generation of simulated transaction data |
| pandas and NumPy | Data processing and generation, where used by the Python script |
| MySQL | Structured storage and querying of imported analytical data |
| MySQL Workbench | Interface for working with tables and SQL queries |
| Power BI Desktop | Data modelling, visualisations, and interactive report pages |
| DAX | Measures and calculations in the Power BI report |

## 11. Project Structure

The following is a suggested structure for organising the portfolio. Keep it aligned with the files and folders that actually exist in your project.

```text
Maharashtra-Iron-Works-Portfolio/
├── README.md
├── PowerBI/
│   └── Maharashtra_Iron_Works_Inventory_Analytics.pbix
├── Website/
│   ├── Apps Script server code
│   ├── Worker product page
│   └── PIN-protected admin page
├── Screenshots/
│   ├── Website worker QR page
│   ├── Website admin page
│   ├── 01-overview.png
│   ├── 02-monthly-trends.png
│   ├── 03-product-analysis.png
│   ├── 04-stock-risk.png
│   └── 05-sales-revenue.png
├── Documentation/
│   ├── Project requirements
│   ├── Process flow
│   └── Testing notes
├── SQL/
│   ├── Table definitions (if available)
│   └── Analysis queries (if available)
└── Python/
    ├── Transaction data generation script (if included)
    └── requirements.txt (if included)
```

Do not list files as included in the repository until they have actually been added.

## 12. How to Explore the Project

### Power BI report

Open the `.pbix` file in Power BI Desktop to interact with the dashboard pages, charts, and filters. Screenshots can be used to preview the report without opening Power BI.

### Website

The Apps Script web application must be deployed in the relevant Google account to run. Keep private deployment links and admin credentials secure.

### Google Sheets

The connected spreadsheet serves as the inventory data source for the website. Avoid publishing private business, staff, or customer information.

### Python and SQL

If the Python script and SQL files are included, review the script to regenerate the simulated transaction dataset and run the SQL queries against a suitably prepared MySQL database. Update the instructions to match the actual filenames and setup steps.

## 13. Data Notes and Limitations

- The transaction history was generated using Python and is simulated; it is not verified historical sales data.
- Any simulated cost prices, supplier details, lead times, or reorder levels should be labelled as assumptions.
- Revenue uses stock-out quantity multiplied by the product's current selling price. This may not equal actual realised revenue, especially if prices changed over time or stock-outs include non-sale removals.
- The final month in the dataset is incomplete, so monthly comparisons should account for the partial period.
- Stock-risk findings depend on the product quantities and reorder levels in the analytical dataset.
- Google Sheets may be appropriate for a small-scale workflow but may require a more robust database and access-control design as usage grows.
- Power BI reflects changes according to the configured data connection and refresh process. The report is not claimed to update instantly after every website stock change.

## 14. Future Improvements

- Validate generated transaction history against real business records where permission and reliable data are available.
- Store the selling price at the time of each transaction for more accurate revenue analysis.
- Improve inventory audit history and reporting for stock adjustments.
- Add supplier and purchase-order tracking if required.
- Strengthen access control and review PIN-based authentication before broader deployment.
- Document a repeatable process for loading data into MySQL and refreshing Power BI.
- Include SQL scripts, a data dictionary, testing evidence, and architecture diagrams.
- Consider a more scalable database if transaction volume or concurrent usage grows.

## 15. Author

- LinkedIn: https://www.linkedin.com/in/deep-chandak-186957326?utm_source=share_via&utm_content=profile&utm_medium=member_android
- Email: deepchandak7@gmail.com
