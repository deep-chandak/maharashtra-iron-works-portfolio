# Setup Guide

This guide describes the main setup stages. Some steps depend on your Google, MySQL, and Power BI environments.

## 1. Website and Google Sheets
1. Open Google Apps Script and create/open the project.
2. Add the contents of `Website/Code.gs`, `Website/Index.html`, and `Website/Admin.html` to the corresponding Apps Script files.
3. Review the spreadsheet ID, sheet/tab names, column names, and configuration values in the code.
4. Do not publish credentials, admin PINs, private spreadsheet links, or access tokens in this public repository.
5. Test product display, QR links, and stock add/remove behavior using non-sensitive sample data.
6. Deploy as a web app only after reviewing access permissions and testing the admin flow.

## 2. Python data workflow
1. Install Python 3.
2. Install dependencies used by the script, such as pandas and numpy: `pip install pandas numpy`
3. Review `Python/make_simulated_data.py` before running it.
4. Check the input filename expected by the script. The script may expect `product_sheet.csv`; do not run it until the expected input file is present and output paths are understood.
5. Keep generated CSVs clearly labelled as simulated/demo data.

## 3. MySQL
1. Install and start MySQL.
2. Open the `.sql` files in `MySQL/` in a MySQL client.
3. Review database/table names and column names against the actual CSV schema before executing queries.
4. Run table-creation and validation scripts first, then analysis queries.
5. Never include database passwords or connection credentials in the repository.

## 4. Power BI
1. Open the `.pbix` file from `PowerBI/` using Power BI Desktop.
2. If prompted, update data-source paths or credentials for your environment.
3. Refresh only after confirming connected sources exist and match the expected schema.
4. Use screenshots in `Screenshots/` as a visual reference.

## Reproducibility note
The setup may require adapting file paths, spreadsheet IDs, sheet names, and database schema. Test the workflow before presenting it as a deployable production system.
