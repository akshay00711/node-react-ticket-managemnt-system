# Server Usage Guide

This guide shows how to run and use the ticketing API with mock, SQL, and NoSQL modes.

## Start The Server

```powershell
cd node-backend
npm install
Copy-Item .env.example .env
npm run dev
```

Server URL:

```text
http://localhost:8080
```

Health check:

```text
GET /health
```

Ticket API base path:

```text
/api/tickets
```

## Choose A Mode

### Mock Mode

Use this when you do not want a database.

```env
DATA_SOURCE=mock
```

Data comes from:

```text
src/mocks/tickets.mock.js
```

### NoSQL JSON Mode

Use this for document-style local storage without MongoDB.

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=json-file
DB_FILE_PATH=./data/tickets-nosql.json
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

### MongoDB Mode With Mongoose

Use this for MongoDB through Mongoose ODM.

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=mongoose
NOSQL_CONNECTION_STRING=mongodb://localhost:27017
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

### SQL JSON Mode

Use this for table-style local storage without a SQL database.

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sql-json-file
DB_FILE_PATH=./data/tickets-sql.json
SQL_TICKETS_TABLE=tickets
```

### SQL Mode With Sequelize

Use this for SQL databases through Sequelize ORM. Local SQLite example:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sequelize
SQL_DIALECT=sqlite
SQLITE_STORAGE=./data/tickets.sqlite
SQL_TICKETS_TABLE=tickets
```

Postgres example:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sequelize
SQL_DIALECT=postgres
SQL_CONNECTION_STRING=postgres://user:password@localhost:5432/ticketing
SQL_TICKETS_TABLE=tickets
```

Restart the server after changing `.env`.

## API Examples

### List Tickets

```bash
curl http://localhost:8080/api/tickets
```

Filter by status:

```bash
curl "http://localhost:8080/api/tickets?status=OPEN"
```

### Get One Ticket

```bash
curl http://localhost:8080/api/tickets/mock-ticket-1
```

In database mode, use the ticket `id` returned from the create/list API.

### Create Ticket

```bash
curl -X POST http://localhost:8080/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Customer cannot login",
    "description": "Login fails after password reset.",
    "status": "OPEN",
    "priority": "HIGH",
    "assignee": "alice"
  }'
```

### Update Ticket

```bash
curl -X PUT http://localhost:8080/api/tickets/TICKET_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Customer cannot login",
    "description": "Issue is being investigated.",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "assignee": "rahul"
  }'
```

Replace `TICKET_ID` with the real ticket id.

### Delete Ticket

```bash
curl -X DELETE http://localhost:8080/api/tickets/TICKET_ID
```

## Ticket Fields

```json
{
  "id": "generated-by-server",
  "title": "Customer cannot login",
  "description": "Login fails after password reset.",
  "status": "OPEN",
  "priority": "HIGH",
  "assignee": "alice",
  "createdAt": "2026-06-20T10:00:00.000Z",
  "updatedAt": "2026-06-20T10:00:00.000Z"
}
```

Allowed status values:

```text
OPEN, IN_PROGRESS, RESOLVED, CLOSED
```

Allowed priority values:

```text
LOW, MEDIUM, HIGH, URGENT
```

`title` is required. `status` defaults to `OPEN`. `priority` defaults to `MEDIUM`.

## What Changes Between Modes?

The API does not change. These routes work in mock, SQL, and NoSQL modes:

```text
GET    /api/tickets
GET    /api/tickets/:id
POST   /api/tickets
PUT    /api/tickets/:id
DELETE /api/tickets/:id
```

Only the storage layer changes:

```text
mock               -> src/repositories/mockTicket.repository.js
nosql json         -> src/database/nosqlflow/noSqlJsonFileTicket.adapter.js
nosql mongoose ODM -> src/database/nosqlflow/mongooseTicket.adapter.js
sql json           -> src/database/sqlflow/sqlJsonFileTicket.adapter.js
sql Sequelize ORM  -> src/database/sqlflow/sequelizeTicket.adapter.js
```

This means frontend code can call the same API no matter which mode the server uses.

## Common Problems

If mock data does not change permanently, that is expected. Mock mode resets on restart.

If database data is not saving, check `DATA_SOURCE=database`, `DB_FLOW`, and `DB_FILE_PATH`.

If a custom adapter fails, confirm it exports `createTicketAdapter(config)` and implements `findAll`, `findById`, `create`, `update`, and `delete`.
