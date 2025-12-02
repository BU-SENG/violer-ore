# Finance Tracker (Firebase + React)

This is a simple personal finance tracker built with React, Vite, and Firebase (Auth + Firestore).

## Features

- Email/password registration and login
- Password reset via email
- Add, edit, and delete income/expense transactions
- Monthly budget with over-budget warning
- Dashboard with summaries and charts
- Export transactions as CSV or PDF

## Getting Started

```bash
npm install
npm run dev
```

Make sure you have created the Firebase project and enabled:

- Authentication (Email/Password)
- Firestore Database (in production or test mode)
- Analytics (optional)

The Firebase config in `src/firebase.js` already uses your provided credentials. If you regenerate them, update that file.

## Firebase Hosting (optional)

```bash
npm install -g firebase-tools
firebase login
firebase init
# choose "Hosting" and use `npm run build` as the build command, `dist` as the public directory
firebase deploy
```


FINANCE TRACKER FIREBASE PROJECT
TEAM ROLES AND RESPONSIBILITIES

This document outlines the distributed responsibilities and ownership of modules for the Finance Tracker Firebase Application. Each member is assigned a specific set of components, logic, and UI modules based on their contribution.

1. Ladipo Jesuferanmi (22/1580) – Group Leader
Role: Lead Developer & Project Coordinator
Responsibilities:
•	Overall coordination of the project.
•	Supervision of all modules and integration of team members’ work.
•	Integration of authentication and routing within the main application.
•	Final review of code and approval of changes before submission.
•	Maintaining the README.md file and any additional written reports.
•	Ensuring the complete codebase is prepared and submitted.
•	Writing and updating project documentation as needed.
Primary Files:
•	src/App.jsx
•	src/main.jsx
•	src/contexts/AuthContext.jsx
•	README.md
•	.gitignore
•	Project documentation

2. Obunezi Chidugam Charis (22/0065) 
Role: Dashboard and Data Visualization
Responsibilities:
•	Design and implementation of the main dashboard interface.
•	Implementation of charts and other data visualizations.
•	Development of export-related UI controls.
•	Setup and configuration of Firebase.
•	Firebase Auth integration (sign-in, sign-out).
Primary Files:
•	src/components/Dashboard.jsx
•	src/components/Charts.jsx
•	src/components/ExportButtons.jsx
•	src/firebase.js
•	src/components/auth/Login.jsx

3. John Jessica (22/0299)
Role: State Management and Application Flow Support
Responsibilities:
•	Assist in implementing global state logic and context usage.
•	Bind UI components to AuthContext and routed layouts.
•	Debug context-related and state synchronization issues.
•	Ensure correct flow between dashboard pages and sidebar navigation.
•	Ensure clean and organized commit history during development.
Primary Files:
•	src/contexts/AuthContext.jsx
•	src/App.jsx (support role)

4. Jaiyesimi Emmanuel Oluwaseun (22/0139)
Role: Budget & Transactions UI Developer 
Responsibilities:
•	Design and implementation of the Budget Panel and Monthly Income Panel.
•	UI/UX development for:
o	Add Transaction (new full-screen layout)
o	Edit Transaction
o	Transaction Listing Pages
•	Implementation of modern, responsive UI components.
•	Maintaining and updating styles in styles.css, including:
o	Full-screen page transitions
o	Modern form layouts
o	Neon-glass visual improvements
•	Collaboration on interaction logic for edit/delete operations.
Primary Files:
•	src/components/BudgetPanel.jsx
•	src/components/MonthlyIncomePanel.jsx
•	src/components/TransactionForm.jsx
•	src/components/TransactionList.jsx
•	src/styles.css

5. Jibrin-Paul Esther Eleojo (22/0280)
Role: Assets & Public Interface Manager
Responsibilities:
•	Creation and management of app assets and public icons.
•	Ensure correct file organization under public/assets/.
•	Maintain index.html with correct metadata and branding.
•	Update brand logos and hero images as UI evolves.
Primary Files:
•	public/assets/*
•	index.html

6. Kadiri Daniel Eshiotienamhe (22/0003)
Role: Authentication Flow Developer
Responsibilities:
•	Implementation of Login UI and authentication logic.
•	Firebase Auth integration (sign-in, sign-out).
•	Support for redirect logic and route protection.
•	Collaboration with Jessica & Ladipo to maintain AuthContext.
Primary Files:
•	src/components/auth/Login.jsx
•	src/contexts/AuthContext.jsx (shared responsibility)

7. Obiekwe Kaima Alvin (22/0145) 
Role: Utilities & Export Developer 
Responsibilities:
•	Implementation of export-to-PDF utilities.
•	Development of reusable helper/utility functions.
•	Ensuring export modules work with updated chart & dashboard views.
•	Managing repository structure and ensuring proper organization.
•	Managing the project’s open-source licensing (MIT License).
•	Ensuring LICENSE file is included in the repository.
•	Maintaining attribution and legal compliance.
Primary File:
•	src/utils/exportPdf.js
•	/LICENSE

8. Odoemenam David Chikelu (22/0292) 
Role: Navigation & Sidebar Layout Developer
Responsibilities:
•	Development and refinement of the new animated sidebar.
•	Implement animated page transitions (morph, fade, slide, zoom).
•	Ensure consistent routing between Dashboard pages.
•	Assist in aligning homepage and dashboard design structures
Primary Files:
•	src/components/Sidebar.jsx
•	src/styles.css (navigation & layout sections)
•	src/App.jsx (navigation routing)

