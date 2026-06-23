# Customer Ticketing System

This is a full-stack customer ticketing project built with a separate Node.js backend and React frontend.

Use this README as the common setup guide for both folders:

```text
node-backend/     # Express MVC REST API
node-frontend/    # React + Vite UI
```

## Tech Used

Backend:

- Node.js
- Express.js
- dotenv
- cors
- morgan
- nodemon
- Sequelize ORM for SQL databases
- Mongoose ODM for MongoDB/NoSQL
- sqlite3 for local Sequelize storage
- MVC architecture
- Configurable mock, SQL, and NoSQL storage flows

Frontend:

- React 18
- Vite
- JavaScript
- CSS
- Fetch API

## What The Project Does

- Create customer support tickets
- View all tickets
- View one ticket details
- Update tickets
- Delete tickets
- Filter tickets by status
- Show ticket counts by status
- Run backend with mock data, JSON storage, Sequelize ORM, or Mongoose ODM

## Main Folder Structure

```text
PR/
├── README.md                 # Common guide for backend and frontend
├── node-backend/
│   ├── README.md             # Backend-specific guide
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── controllers/      # API request handlers
│       ├── services/         # Business logic
│       ├── models/           # Ticket validation/helpers
│       ├── routes/           # Express routes
│       ├── repositories/     # Mock/database repository switch
│       ├── database/
│       │   ├── sqlflow/      # SQL-style storage flow
│       │   └── nosqlflow/    # NoSQL-style storage flow
│       ├── mocks/            # Mock data
│       └── middlewares/      # Error handling
└── node-frontend/
    ├── README.md             # Frontend-specific guide
    ├── package.json
    ├── .env.example
    └── src/
        ├── api/              # Backend API calls
        ├── components/       # UI components
        ├── App.jsx           # Main frontend logic
        ├── config.js         # API URL config
        └── styles.css        # Styling
```

## Prerequisites

Install these before running the project:

- Node.js 18 or newer
- npm

Check installation:

```bash
node --version
npm --version
```

## 1. Start The Backend

Open a terminal from the project root:

```powershell
cd node-backend
npm install
Copy-Item .env.example .env
npm run dev
```

On macOS/Linux:

```bash
cd node-backend
npm install
cp .env.example .env
npm run dev
```

Backend URL:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/health
```

## 2. Start The Frontend

Open another terminal from the project root:

```powershell
cd node-frontend
npm install
Copy-Item .env.example .env
npm run dev
```

On macOS/Linux:

```bash
cd node-frontend
npm install
cp .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5174
```

## Environment Setup

Backend environment file:

```text
node-backend/.env
```

Frontend environment file:

```text
node-frontend/.env
```

## Backend Data Modes

### Mock Mode

Use this when you do not want any database:

```env
DATA_SOURCE=mock
```

Mock data file:

```text
node-backend/src/mocks/tickets.mock.js
```

### SQL JSON Mode

Use this for simple SQL-style local storage without an ORM:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sql-json-file
DB_FILE_PATH=./data/tickets-sql.json
SQL_TICKETS_TABLE=tickets
```

### SQL ORM Mode

Use this for SQL databases through Sequelize ORM:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sequelize
SQL_DIALECT=sqlite
SQLITE_STORAGE=./data/tickets.sqlite
SQL_TICKETS_TABLE=tickets
```

For Postgres, MySQL, or another Sequelize-supported SQL database, update `SQL_DIALECT` and `SQL_CONNECTION_STRING`.

SQL flow folder:

```text
node-backend/src/database/sqlflow/
```

### NoSQL JSON Mode

Use this for simple NoSQL-style local storage without MongoDB:

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=json-file
DB_FILE_PATH=./data/tickets-nosql.json
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

### MongoDB ODM Mode

Use this for MongoDB through Mongoose ODM:

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=mongoose
NOSQL_CONNECTION_STRING=mongodb://localhost:27017
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

NoSQL flow folder:

```text
node-backend/src/database/nosqlflow/
```

Restart the backend after changing `.env`.

## Frontend API Config

Default frontend `.env`:

```env
VITE_API_BASE_URL=/api
VITE_HEALTH_URL=/health
```

In local development, Vite proxies `/api` and `/health` to:

```text
http://localhost:8080
```

## API Endpoints

The frontend uses these backend APIs:

| Method | Endpoint | Use |
| ------ | -------- | --- |
| GET | `/health` | Check backend status |
| GET | `/api/tickets` | Get all tickets |
| GET | `/api/tickets?status=OPEN` | Filter tickets |
| GET | `/api/tickets/:id` | Get one ticket |
| POST | `/api/tickets` | Create ticket |
| PUT | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |

Example ticket body:

```json
{
  "title": "Customer cannot login",
  "description": "Login fails after password reset.",
  "status": "OPEN",
  "priority": "HIGH",
  "assignee": "alice"
}
```

Allowed statuses:

```text
OPEN, IN_PROGRESS, RESOLVED, CLOSED
```

Allowed priorities:

```text
LOW, MEDIUM, HIGH, URGENT
```

## Useful Commands

Backend:

```bash
cd node-backend
npm run dev
npm start
npm run check
```

Frontend:

```bash
cd node-frontend
npm run dev
npm run build
npm run preview
```

## More Details

Folder-specific guides are also available:

- `node-backend/README.md`
- `node-frontend/README.md`
- `node-backend/docs/setup-database-modes.md`
- `node-backend/docs/server-usage-guide.md`
 