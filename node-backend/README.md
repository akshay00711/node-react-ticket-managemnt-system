# Node Backend - Customer Ticketing API

This folder contains the Node.js backend for the customer ticketing system. It exposes REST APIs to create, view, update, filter, and delete tickets.

The backend follows MVC architecture and keeps the database layer configurable, so the same API can run with mock data, SQL-style storage, or NoSQL-style storage.

## Tech Used

- Node.js
- Express.js
- CommonJS modules
- dotenv for environment variables
- cors for frontend access
- morgan for request logging
- nodemon for local development
- Sequelize ORM for SQL databases
- Mongoose ODM for MongoDB/NoSQL
- sqlite3 for local Sequelize SQLite storage

## What This Backend Does

- Creates customer support tickets
- Lists all tickets
- Filters tickets by status
- Gets one ticket by ID
- Updates existing tickets
- Deletes tickets
- Supports mock, SQL, and NoSQL storage modes

## Folder Structure

```text
node-backend/
├── src/
│   ├── app.js                       # Express app setup
│   ├── server.js                    # Starts the HTTP server
│   ├── config/                      # App, database, and ticket constants
│   ├── controllers/                 # Request and response logic
│   ├── services/                    # Business logic
│   ├── models/                      # Ticket validation and helpers
│   ├── routes/                      # API route definitions
│   ├── repositories/                # Mock/database repository selection
│   ├── database/
│   │   ├── sqlflow/                 # SQL-style adapters
│   │   └── nosqlflow/               # NoSQL-style adapters
│   ├── mocks/                       # Mock ticket data
│   ├── middlewares/                 # Error and 404 handling
│   └── utils/                       # Shared utilities
├── docs/                            # Extra setup and usage guides
├── .env.example                     # Example environment config
└── package.json
```

## Setup

Install Node.js 18 or newer first.

From the project root:

```powershell
cd node-backend
npm install
Copy-Item .env.example .env
```

On macOS/Linux:

```bash
cd node-backend
npm install
cp .env.example .env
```

## Start The Backend

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The backend runs on:

```text
http://localhost:8080
```

Health check:

```text
GET http://localhost:8080/health
```

## Environment Modes

Edit `.env` to choose how data is stored.

### Mock Mode

Use this when you do not want any database setup.

```env
DATA_SOURCE=mock
```

Mock data is stored in:

```text
src/mocks/tickets.mock.js
```

Mock data resets when the server restarts.

### NoSQL JSON Mode

Use this for quick document-style local storage without MongoDB.

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=json-file
DB_FILE_PATH=./data/tickets-nosql.json
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

This local adapter stores data in a JSON file but follows a NoSQL collection shape.

### MongoDB Mode With Mongoose ODM

Use this for real MongoDB integration through Mongoose.

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=mongoose
NOSQL_CONNECTION_STRING=mongodb://localhost:27017
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

Mongoose gives schema validation, model methods, and MongoDB document mapping.

### SQL JSON Mode

Use this for quick table-style local storage without a SQL database.

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sql-json-file
DB_FILE_PATH=./data/tickets-sql.json
SQL_TICKETS_TABLE=tickets
```

This local adapter stores data in a JSON file but follows a SQL row/table shape.

### SQL Mode With Sequelize ORM

Use this for real SQL ORM integration. The default local ORM setup uses SQLite:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sequelize
SQL_DIALECT=sqlite
SQLITE_STORAGE=./data/tickets.sqlite
SQL_TICKETS_TABLE=tickets
```

For another SQL database, set the dialect and connection string:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sequelize
SQL_DIALECT=postgres
SQL_CONNECTION_STRING=postgres://user:password@localhost:5432/ticketing
SQL_TICKETS_TABLE=tickets
```

Sequelize gives models, table mapping, validation, and query helpers for SQL databases.

## Connect A Real Database

Built-in real database options:

```text
SQL:   DB_FLOW=sql   + DB_CLIENT=sequelize
NoSQL: DB_FLOW=nosql + DB_CLIENT=mongoose
```

You can also create your own adapter.

For a custom SQL database adapter, create it in:

```text
src/database/sqlflow/
```

For a real NoSQL database, create an adapter in:

```text
src/database/nosqlflow/
```

Then set:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_ADAPTER_PATH=./src/database/sqlflow/postgresTicket.adapter.js
```

or:

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_ADAPTER_PATH=./src/database/nosqlflow/mongoTicket.adapter.js
```

Every adapter must return these methods:

```js
findAll(filters)
findById(id)
create(ticket)
update(id, ticket)
delete(id)
```

## API Endpoints

Base URL:

```text
http://localhost:8080/api/tickets
```

| Method | Endpoint           | Use |
| ------ | ------------------ | --- |
| GET    | `/api/tickets`     | Get all tickets |
| GET    | `/api/tickets?status=OPEN` | Filter tickets by status |
| GET    | `/api/tickets/:id` | Get one ticket |
| POST   | `/api/tickets`     | Create ticket |
| PUT    | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |

Example create/update body:

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

```bash
npm run dev      # Start with nodemon
npm start        # Start normally
npm run check    # Syntax-check JavaScript files
```

## More Guides

- `docs/setup-database-modes.md`
- `docs/server-usage-guide.md`
