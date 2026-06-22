# Node.js Ticketing API

An Express MVC API for creating, updating, deleting, listing, and viewing customer support tickets.

## Features

- Full ticket CRUD API at `/api/tickets`
- MVC structure with controllers, services, models, routes, repositories, and middleware
- `mock` mode with isolated seed data in `src/mocks/tickets.mock.js`
- `database` mode behind a repository/adapter interface
- Separate `sqlflow` and `nosqlflow` folders for database-specific code
- Built-in SQL-shaped and NoSQL-shaped JSON-file adapters for local persistence
- Custom adapter hooks for Postgres, MySQL, MongoDB, DynamoDB, or another database

## Folder Structure

```text
node-backend/
├── src/
│   ├── app.js                         # Express app setup
│   ├── server.js                      # HTTP server startup
│   ├── config/                        # App, database, and domain constants
│   ├── controllers/                   # HTTP request/response handlers
│   ├── database/
│   │   ├── ticketAdapter.factory.js   # Chooses SQL or NoSQL flow
│   │   ├── sqlflow/                   # SQL table adapters and mappers
│   │   └── nosqlflow/                 # NoSQL collection adapters
│   ├── middlewares/                   # Error and 404 handling
│   ├── mocks/                         # Mock-mode ticket data only
│   ├── models/                        # Ticket creation, update, and validation rules
│   ├── repositories/                  # Storage abstraction implementations
│   ├── routes/                        # API route definitions
│   ├── services/                      # Business logic
│   └── utils/                         # Shared utilities
├── .env.example
└── package.json
```

## Getting Started

```bash
cd node-backend
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:8080` by default.

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp .env.example .env`.

Run `npm run check` to syntax-check the JavaScript files.

## More Guides

- `docs/setup-database-modes.md` explains setup, compatibility, and how to switch from mock to SQL or NoSQL database mode.
- `docs/server-usage-guide.md` explains how to run and use the API in mock, SQL, and NoSQL modes with simple examples.

## Configuration

Use `.env` to switch between mock mode, SQL database mode, and NoSQL database mode.

```env
DATA_SOURCE=mock
```

Mock mode uses `src/mocks/tickets.mock.js` and resets whenever the server restarts.

### NoSQL Flow

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=json-file
DB_FILE_PATH=./data/tickets.json
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

This uses `src/database/nosqlflow/noSqlJsonFileTicket.adapter.js` and stores tickets as a document collection.

For MongoDB, DynamoDB, or another NoSQL database, create an adapter in `src/database/nosqlflow/` and use:

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_ADAPTER_PATH=./src/database/nosqlflow/mongoTicket.adapter.js
NOSQL_CONNECTION_STRING=mongodb://localhost:27017
```

See `src/database/nosqlflow/customNoSqlTicket.adapter.example.js`.

### SQL Flow

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sql-json-file
DB_FILE_PATH=./data/tickets-sql.json
SQL_TICKETS_TABLE=tickets
```

This uses `src/database/sqlflow/sqlJsonFileTicket.adapter.js` and stores tickets as table-shaped rows.

For Postgres, MySQL, SQL Server, or another SQL database, create an adapter in `src/database/sqlflow/` and use:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_ADAPTER_PATH=./src/database/sqlflow/postgresTicket.adapter.js
SQL_CONNECTION_STRING=postgres://user:password@localhost:5432/ticketing
SQL_TICKETS_TABLE=tickets
```

See `src/database/sqlflow/customSqlTicket.adapter.example.js`.

All adapters implement the same repository contract, so controllers, routes, and services do not change:

```js
findAll(filters)
findById(id)
create(ticket)
update(id, ticket)
delete(id)
```

The adapter module should export `createTicketAdapter(config)`.

## API Reference

Base path: `/api/tickets`

| Method | Path               | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/api/tickets`     | List tickets, optional `?status=`  |
| GET    | `/api/tickets/:id` | Get one ticket                     |
| POST   | `/api/tickets`     | Create a ticket                    |
| PUT    | `/api/tickets/:id` | Update a ticket                    |
| DELETE | `/api/tickets/:id` | Delete a ticket                    |

Example payload:

```json
{
  "title": "Login page returns 500 error",
  "description": "Customers cannot log in.",
  "status": "OPEN",
  "priority": "URGENT",
  "assignee": "alice"
}
```

Allowed statuses: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`.

Allowed priorities: `LOW`, `MEDIUM`, `HIGH`, `URGENT`.
