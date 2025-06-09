MOMO-analysis
MTN MoMo Transaction Dashboard is a web application for analyzing SMS transaction data from MTN Mobile Money (MoMo). Built with TypeScript, React, Tailwind CSS, and Vite, it provides an interactive interface to search, filter, visualize, and view details of transactions categorized into 10 types (e.g., Incoming Money, Payments to Code Holders, Bank Deposits).
Table of Contents

Overview
Features
Tech Stack
Setup
Usage
Project Structure
Data Source
Assignment Details
Authors
License

Overview
This project fulfills the requirements of the MTN MoMo Transaction Dashboard assignment. It processes SMS transaction data (originally in XML format) into a JSON format for frontend analysis. The dashboard allows users to:

Search transactions by keywords in the SMS body.
Filter by transaction type, date range, and minimum amount.
Visualize transaction patterns using four charts.
View a list of filtered transactions and detailed information for selected transactions.

The frontend is responsive, styled with Tailwind CSS, and uses recharts for visualizations and react-day-picker for date filtering, integrated with shadcn/ui components for a modern UI.
Features

Search: Filter transactions by keywords (case-insensitive) in the SMS body.
Filters:
Transaction type (dropdown with 10 categories: Incoming Money, Payments to Code Holders, Transfers to Mobile Numbers, Bank Deposits, Airtime Bill Payments, Cash Power Bill Payments, Transactions Initiated by Third Parties, Withdrawals from Agents, Bank Transfers, Internet and Voice Bundle Purchases).
Date range (using react-day-picker for selecting start/end dates).
Minimum amount (using a slider).


Visualizations (built with recharts):
Bar chart: Transaction volume by type (count of transactions).
Line chart: Monthly transaction amounts for trend analysis.
Pie chart: Distribution of payments vs. deposits.
Bar chart: Average transaction amount by type.


Transaction List: Scrollable list of filtered transactions with clickable items to view details.
Details View: Displays full transaction details (body, type, amount, date).
Responsive Design: Adapts to mobile and desktop screens using Tailwind CSS.
Optional API: Bonus implementation for fetching data from a backend API (e.g., /api/transactions).

Tech Stack

Frontend:
TypeScript: For type-safe code.
React: Component-based UI.
Tailwind CSS: Utility-first styling.
Vite: Fast development server and build tool.
Recharts: Chart visualizations.
React-day-picker: Date range filtering.
Shadcn/ui: UI components (e.g., date picker, slider, dropdown).


Dependencies (key packages):
react, react-dom: ^18.3.0
date-fns: ^3.6.0 (downgraded to resolve react-day-picker conflict)
react-day-picker: ^8.10.1
recharts: ^2.12.7
tailwindcss: ^3.4.11
@radix-ui/react-*: For shadcn/ui components


Development:
ESLint: Code linting.
TypeScript-ESLint: TypeScript linting.
PostCSS, Autoprefixer: CSS processing.



Setup
Follow these steps to set up and run the project locally.
Prerequisites

Node.js (v18 or higher)
npm (v9 or higher)
Git

Installation

Clone the repository:git clone https://github.com/HIGIRO1234/MOMO-analysis.git
cd MOMO-analysis


Install dependencies:npm install

Note: If dependency conflicts occur (e.g., date-fns vs. react-day-picker), ensure date-fns is set to ^3.6.0 in package.json and re-run npm install.
Run the development server:npm run dev


Open http://localhost:5173 (default Vite port) in your browser to view the dashboard.

Optional API Setup (Bonus)

If using a backend API (e.g., Flask or Node.js), start the server separately (e.g., python api.py for Flask).
Update src/App.tsx to fetch data from the API endpoint (e.g., /api/transactions).
Ensure the database (e.g., SQLite transactions.db) is configured and accessible.

Usage

Search: Enter keywords in the search bar to filter transactions by SMS body content.
Filter:
Select a transaction type from the dropdown.
Choose a date range using the date picker.
Adjust the amount slider to set a minimum transaction amount.
Click "Apply Filters" to update results, or "Reset Filters" to clear.


Visualizations: View four charts displaying transaction volume, monthly trends, payment/deposit distribution, and average amounts.
Transaction List: Scroll through filtered transactions; click an item to view details (body, type, amount, date).

Project Structure
MOMO-analysis/
├── public/                   # Static assets
├── src/                      # Source code
│   ├── components/           # React components (e.g., Controls, Visualizations, Details)
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   ├── main.css              # Tailwind CSS
│   └── assets/               # Images, fonts
├── transactions.json         # Sample transaction data (JSON)
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
├── .gitignore                # Git ignore file (excludes node_modules, dist)
├── README.md                 # This file
├── AUTHORS                   # Contributors
└── [transactions.db]         # Optional SQLite database (for API)

Data Source

Input: SMS transaction data from modified_sms_v2 (1).xml (~1600 transactions).
Processing: Converted to transactions.json using a Python script (e.g., with xml.etree.ElementTree), with fields:
id: Unique identifier (number).
body: SMS text (string).
type: One of 10 transaction categories (string).
amount: Transaction amount in RWF (number).
date: Date in YYYY-MM-DD format (string).


Optional API: Data can be served from a database (e.g., SQLite) via an API endpoint for bonus marks.

Assignment Details
This project fulfills the MTN MoMo Transaction Dashboard assignment, including:

Frontend: Interactive dashboard with search, filters, visualizations, and details view.
Visualizations: Four charts using recharts for transaction analysis.
Styling: Responsive design with Tailwind CSS and shadcn/ui components.
Challenges:
Resolved dependency conflict between date-fns@4.1.0 and react-day-picker@8.10.1 by downgrading to date-fns@3.6.0.
Removed large node_modules files from Git history using git filter-repo to comply with GitHub’s size limits.


Submission:
Code: This repository.
Database: Optional transactions.db or .sql dump.
Report: 2-3 page PDF documenting approach, design decisions, and challenges.
Video: 5-minute walkthrough (linked in repository).



Authors

HIGIRO1234: Lead developer, responsible for frontend development, data integration, and documentation.


