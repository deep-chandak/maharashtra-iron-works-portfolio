# Maharashtra Iron Works — Inventory Management & Analytics

### QR-Based Inventory Management | Google Apps Script | Google Sheets | Python | MySQL | Power BI

## Project Overview

This project demonstrates an end-to-end inventory management and analytics solution developed around the operational requirements of Maharashtra Iron Works.

The project combines a QR-based inventory website, Google Sheets integration, Python-generated transaction data, MySQL analysis, and a five-page Power BI dashboard.

The solution addresses two major business needs:

- **Inventory Management:** Replace manual pen-and-paper stock tracking with a digital system for checking products, adding stock, recording sold stock, and maintaining transaction records.
- **Inventory Analytics:** Analyze product performance, stock movements, estimated sales revenue, and inventory risks through SQL queries and Power BI dashboards.

> **Data Transparency:** Transaction history used for analytical purposes was generated using Python. Some analytical fields, including cost prices and reorder levels, may be simulated. Findings based on simulated data should be treated as illustrative rather than verified historical business performance.

---

## 1. Business Problem

Traditional inventory management using manual registers can create operational challenges:

- Difficulty checking available stock quickly
- Time-consuming stock additions and deductions
- Limited visibility into product details and storage locations
- Risk of manual recording errors
- Difficulty maintaining transaction history
- Limited reporting and inventory analytics

The objective was to create a more accessible digital inventory workflow and demonstrate how inventory data can support business decisions.

---

## 2. QR-Based Inventory Management Website

**Technologies:** HTML, CSS, JavaScript, Google Apps Script, Google Sheets

A web-based inventory management interface was developed using Google Apps Script.

### Admin Interface

The administrative interface includes:

- Product listings with images and product details
- Search by product name, code, brand, category, and rack
- Current stock quantity and stock-status indicators
- Stock addition and removal actions
- Product QR code generation and display
- Responsive layout for desktop and mobile devices

### Worker QR Interface

Workers can scan a product QR code to access its product information.

The QR-based workflow supports:

- Product identification
- Product details and stock availability
- Stock addition
- Recording sold stock
- Staff-name entry for sales transactions

### Inventory Update Workflow

1. A user selects or scans a product.
2. Product information is retrieved through Google Apps Script.
3. The user enters a stock quantity and performs an available action.
4. The application processes the stock update.
5. The corresponding Google Sheets stock value is updated.
6. A transaction entry is recorded.
7. Updated inventory information can be viewed through the website.

The system reduces dependence on manual registers and provides a centralized spreadsheet-backed inventory record.

---

## 3. Google Sheets Integration

Google Sheets acts as the operational inventory data store for the website.

### Product Sheet

The product sheet contains information such as:

- Product ID and code
- Product name
- Brand and category
- Product image
- Selling price
- Material and size
- Rack location
- Current stock
- QR URL and QR code

### Transaction Sheet

The transaction sheet records:

- Timestamp
- Product ID
- Product name
- Transaction type
- Quantity
- Staff name, where applicable
- Transaction source

The system uses the following transaction conventions:

- **IN:** Stock received or added
- **OUT:** Stock removed or sold, depending on the operation

Google Apps Script connects the website to the associated spreadsheet and handles inventory updates.

---

## 4. Python — Transaction Data Generation

**Technology:** Python

Python was used to generate simulated transaction data for analytical purposes.

The repository includes:

- `make_simulated_data.py`
- `products.csv`
- `transactions.csv`

The generated data supports demonstrations of inventory movement, product activity, and reporting workflows.

This analytical dataset is distinct from the operational transaction records created by the Google Apps Script website.

---

## 5. MySQL Database and SQL Analysis

**Technology:** MySQL

A relational database workflow was developed to organize and analyze product and transaction information.

### SQL Queries

| File | Purpose |
|---|---|
| `01_create_database_tables.sql` | Create database tables |
| `02_transaction_validation.sql` | Validate transaction data |
| `03_data_quality_summary.sql` | Summarize data quality |
| `04_transaction_date_range.sql` | Check transaction date coverage |
| `05_product_count.sql` | Count products |
| `06_show_tables.sql` | Inspect database tables |
| `07_category_transaction_analysis.sql` | Analyze transaction counts and quantities by category and transaction type |
| `08_category_stock_movement.sql` | Summarize stock received and stock removed by category |
| `09_low_stock_products.sql` | Identify products with low stock |

### Analytical Focus

The SQL work demonstrates:

- Relational joins
- Aggregations
- Conditional aggregation
- Transaction validation
- Product-level and category-level analysis
- Stock movement reporting
- Low-stock identification

---

## 6. Power BI — Inventory Analytics Dashboard

**Technology:** Microsoft Power BI, DAX

A five-page Power BI dashboard was developed to explore inventory and transaction information.

### Dashboard Pages

**Page 1 — Overview**

Provides an overview of key inventory and business metrics.

**Page 2 — Monthly Trend**

Explores transaction and sales activity over time using the available month and year information.

**Page 3 — Product Analysis**

Examines product-level inventory and transaction activity.

**Page 4 — Stock Risk Analysis**

Highlights inventory availability and low-stock or reorder-related risks.

**Page 5 — Sales and Revenue**

Examines sold quantities and estimated sales revenue.

### DAX Measures

DAX was used to calculate business metrics.

For example, total revenue is calculated using transactions classified as `OUT` and the corresponding product selling prices:

```dax
Total Revenue =
SUMX(
    FILTER(
        Transactions,
        Transactions[transaction_type] = "OUT"
    ),
    Transactions[quantity] *
    RELATED(product[selling_price])
)
```

For the analytical dataset, `OUT` represents sold stock in this revenue calculation.

### Inventory Thresholds

The project uses an example low-stock threshold of 10 units and reorder level of 5 units in its analytical work. Threshold interpretation depends on the relevant calculation or report.

---

## 7. Screenshots

### Power BI Dashboard

**Overview**

![Dashboard Overview](Maharashtra-Iron-Works-Portfolio/screenshots/01_overview.png)

**Monthly Trend**

![Monthly Trend](Maharashtra-Iron-Works-Portfolio/screenshots/02_monthlytrend.png)

**Product Analysis**

![Product Analysis](Maharashtra-Iron-Works-Portfolio/screenshots/03_productanalysis.png)

**Stock Risk Analysis**

![Stock Risk Analysis](Maharashtra-Iron-Works-Portfolio/screenshots/04_stockriskanalysis.png)

**Sales and Revenue**

![Sales and Revenue](Maharashtra-Iron-Works-Portfolio/screenshots/05_salesndrevenue.png)

### QR-Based Inventory Website

**Admin Interface**

![Admin Interface](Maharashtra-Iron-Works-Portfolio/screenshots/website/01_admin%20page.png)

**Admin Stock Management**

![Admin Stock Management](Maharashtra-Iron-Works-Portfolio/screenshots/website/02_admin_stockpage.png)

**Product QR Code**

![Product QR](Maharashtra-Iron-Works-Portfolio/screenshots/website/03_QR_product.png)

**Worker QR Workflow**

![Worker QR](Maharashtra-Iron-Works-Portfolio/screenshots/website/04_worker_qr.png)

**Worker Interface**

![Worker Interface](Maharashtra-Iron-Works-Portfolio/screenshots/website/05_workerpage.png)

**Google Sheets Product Records**

![Google Sheets Products](Maharashtra-Iron-Works-Portfolio/screenshots/website/06_sheet_products.png)

**Saved Transactions**

![Saved Transactions](Maharashtra-Iron-Works-Portfolio/screenshots/website/07_savedtransaction.png)

**Staff Name Recording**

![Staff Names](Maharashtra-Iron-Works-Portfolio/screenshots/website/08_staffnames.png)

---

## 8. Project Structure

```text
maharashtra-iron-works-portfolio/
│
├── README.md
│
└── Maharashtra-Iron-Works-Portfolio/
    │
    ├── README.md
    │
    ├── website/
    │   ├── admin.html
    │   ├── Index.html
    │   └── code.gs
    │
    ├── python/
    │   ├── make_simulated_data.py
    │   ├── products.csv
    │   └── transactions.csv
    │
    ├── MYSQL/
    │   ├── 01_create_database_tables.sql
    │   ├── 02_transaction_validation.sql
    │   ├── 03_data_quality_summary.sql
    │   ├── 04_transaction_date_range.sql
    │   ├── 05_product_count.sql
    │   ├── 06_show_tables.sql
    │   ├── 07_category_transaction_analysis.sql
    │   ├── 08_category_stock_movement.sql
    │   └── 09_low_stock_products.sql
    │
    ├── Power bi/
    │   └── final.pbix
    │
    ├── screenshots/
    │   ├── 01_overview.png
    │   ├── 02_monthlytrend.png
    │   ├── 03_productanalysis.png
    │   ├── 04_stockriskanalysis.png
    │   ├── 05_salesndrevenue.png
    │   └── website/
    │       └── Website and Google Sheets screenshots
    │
    └── documentation/
        ├── Project_Overview.md
        ├── Database_Documentation.md
        ├── PowerBI_Documentation.md
        ├── Setup_Guide.md
        └── Limitations_and_Future_Scope.md
```

---

## 9. Key Skills Demonstrated

- Inventory management workflow design
- QR-based product identification
- Google Apps Script web application development
- Google Sheets integration
- HTML, CSS, and JavaScript
- Python data generation
- MySQL database development
- SQL querying and data validation
- Power BI dashboard development
- DAX measures and data modeling
- Data visualization and business reporting
- Technical documentation

---

## 10. Limitations and Future Scope

### Current Limitations

- Analytical transaction data is simulated.
- Some analytical inventory fields are illustrative.
- Spreadsheet-based inventory storage may require further optimization as data volume grows.
- Access control and deployment configuration require appropriate security review before production use.

### Future Improvements

- Stronger user authentication and role-based permissions
- More detailed audit logs
- Automated low-stock alerts
- Enhanced inventory forecasting
- Improved integration between operational and analytical data
- Expanded reporting and inventory monitoring

---

## 11. Project Outcome

The project demonstrates how a traditional inventory workflow can be digitized through QR-based product identification, a web interface, and Google Sheets integration.

It also demonstrates how Python, MySQL, and Power BI can be combined to build an analytical reporting workflow for understanding stock movements, product activity, inventory risk, and estimated revenue.

The result is a portfolio project covering both operational inventory management and business intelligence.

---

## 12. Documentation

Additional technical information is available in the `documentation` folder, including the project overview, database documentation, Power BI documentation, setup guide, and limitations and future scope.

---

**Project:** Maharashtra Iron Works — Inventory Management & Analytics

**Technologies:** Google Apps Script, Google Sheets, HTML, CSS, JavaScript, Python, MySQL, Power BI, DAX

**Repository:** https://github.com/deep-chandak/maharashtra-iron-works-portfolio
