# Finance Tracker (Firebase + React)
This document clearly defines how responsibilities and project files are distributed among team members for the Finance Tracker Firebase project. Each member has specific modules and tasks, while the group leader coordinates integration and final delivery.

FINANCE TRACKER FIREBASE PROJECT
TEAM ROLES AND RESPONSIBILITIES

1. Ladipo Jesuferanmi (22/1580) – Group Leader
Role: Lead Developer & Project Coordinator
Responsibilities:
•	Overall coordination of the project.
•	Supervision of all modules and integration of team members’ work.
•	Integration of authentication and routing within the main application.
•	Final review of code and approval of changes before submission.
•	Maintaining the README.md file and any additional written reports.
Primary Files:
•	src/App.jsx
•	src/main.jsx
•	src/contexts/AuthContext.jsx
•	README.md

2. Obunezi Chidugam Charis (22/0065)  – Dashboard & Visualization Developer
Role: Dashboard and Data Visualization
Responsibilities:
•	Design and implementation of the main dashboard interface.
•	Implementation of charts and other data visualizations.
•	Development of export-related UI controls.
•	Setup and configuration of Firebase.
Primary Files:
•	src/components/Dashboard.jsx
•	src/components/Charts.jsx
•	src/components/ExportButtons.jsx
•	src/firebase.js

3. John Jessica (22/0299) – State Logic & Integration Developer
Role: State Management and Application Flow Support
Responsibilities:
•	Assist in designing and implementing global state management.
•	Connect components to the authentication and global context.
•	Debug and resolve state-related issues within the app.
Primary Files:
•	src/contexts/AuthContext.jsx
•	src/App.jsx (support role)

4. Jaiyesimi Emmanuel Oluwaseun (22/0139) – Budget and Transactions UI Developer
Role: User Interface for Budgeting and Transactions
Responsibilities:
•	Design and implementation of the budget panel interface.
•	Implementation of monthly income panel.
•	Development of transaction form and transaction list UI.
•	Contribution to styling and layout of these components.
Primary Files:
•	src/components/BudgetPanel.jsx
•	src/components/MonthlyIncomePanel.jsx
•	src/components/TransactionForm.jsx
•	src/components/TransactionList.jsx
•	src/styles.css

5. Jibrin-Paul Esther Eleojo (22/0280) – Assets and Public Interface Manager
Role: Public Assets and Entry Page Management
Responsibilities:
•	Organization and creation of all static assets and logos.
•	Ensuring correct linking of assets in the project.
•	Maintenance of the main HTML entry file.
Primary Files:
•	public/assets/*
•	index.html

6. Kadiri Daniel Eshiotienamhe (22/0003) – Authentication Flow Developer
Role: Login and Authentication Logic
Responsibilities:
•	Implementation of login page and logic.
•	Integration of login functionality with Firebase.
•	Collaboration on authentication state handling.
Primary Files:
•	src/components/auth/Login.jsx
•	src/contexts/AuthContext.jsx (shared responsibility)

7. Kenneth Mitchel Chukwuyere (22/0045) – Registration and Password Recovery Developer
Role: User Registration and Password Reset
Responsibilities:
•	Development of the user registration page and logic.
•	Implementation of password reset functionality.
•	Ensuring smooth user experience during authentication processes.
Primary Files:
•	src/components/auth/Register.jsx
•	src/components/auth/ResetPassword.jsx

8. Obiekwe Kaima Alvin (22/0145) – Utilities and Export Developer
Role: Utility Functions and PDF Export
Responsibilities:
•	Implementation of export-to-PDF functionality.
•	Development and maintenance of utility functions used across the project.
Primary File:
•	src/utils/exportPdf.js

9. Ochi Chinemerem Favour (22/0055) – Quality Assurance and Testing Lead
Role: Testing and Quality Control
Responsibilities:
•	Manual testing of all major components and flows.
•	Identification and reporting of bugs or UI issues.
•	Verification that implemented features meet the project requirements.
Scope of Testing:
•	All files under src/components/

10. Odoemenam David Chikelu (22/0292) – Documentation and Version Control Manager
Role: Project Documentation and Repository Management
Responsibilities:
•	Writing and updating the project documentation.
•	Ensuring clean commit history and proper version control practices.
•	Assisting the group leader in preparing the project for submission.
•	Ensuring that the complete codebase gets pushed to the Project repository
Primary Files:
•	README.md
•	.gitignore
•	General Git and repository organization

