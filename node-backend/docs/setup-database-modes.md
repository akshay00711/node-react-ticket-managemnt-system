# Setup Database Modes

This project can run with mock data, a SQL-style database flow, or a NoSQL-style database flow. The API routes, controllers, and services stay the same in every mode.

## Quick Compatibility

| Mode | Main Config | Storage Style | Good For | Compatible With |
| ---- | ----------- | ------------- | -------- | --------------- |
| Mock | `DATA_SOURCE=mock` | In-memory mock array | Fast local testing | No real database needed |
| NoSQL local | `DATA_SOURCE=database`, `DB_FLOW=nosql`, `DB_CLIENT=json-file` | Document collection in JSON | Local NoSQL-style testing | MongoDB-like document shape |
| SQL local | `DATA_SOURCE=database`, `DB_FLOW=sql`, `DB_CLIENT=sql-json-file` | Table rows in JSON | Local SQL-style testing | SQL row/table shape |
| Real NoSQL | `DATA_SOURCE=database`, `DB_FLOW=nosql`, `DB_ADAPTER_PATH=...` | Custom adapter | MongoDB, DynamoDB, CouchDB, etc. | Any adapter with the repository methods |
| Real SQL | `DATA_SOURCE=database`, `DB_FLOW=sql`, `DB_ADAPTER_PATH=...` | Custom adapter | Postgres, MySQL, SQL Server, SQLite, etc. | Any adapter with the repository methods |

Mock mode does not use `DB_FLOW`. `DB_FLOW` is only used when `DATA_SOURCE=database`.

## First-Time Setup

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

Start the server:

```bash
npm run dev
```

The server runs at `http://localhost:8080`.

## Use Mock Mode

Use mock mode when you want the API to work without any database.

```env
DATA_SOURCE=mock
```

Mock tickets are stored separately in:

```text
src/mocks/tickets.mock.js
```

Mock data resets when the server restarts.

## Switch From Mock To Database

Change this:

```env
DATA_SOURCE=mock
```

To this:

```env
DATA_SOURCE=database
```

Then choose one database flow:

```env
DB_FLOW=sql
```

or:

```env
DB_FLOW=nosql
```

Restart the server after changing `.env`.

## Setup Local NoSQL Flow

This mode stores tickets as a document collection in a JSON file. It is useful before connecting MongoDB or another NoSQL database.

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_CLIENT=json-file
DB_FILE_PATH=./data/tickets-nosql.json
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

Code location:

```text
src/database/nosqlflow/noSqlJsonFileTicket.adapter.js
```

## Setup Local SQL Flow

This mode stores tickets as table-shaped rows in a JSON file. It is useful before connecting Postgres, MySQL, SQL Server, or SQLite.

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_CLIENT=sql-json-file
DB_FILE_PATH=./data/tickets-sql.json
SQL_TICKETS_TABLE=tickets
```

Code location:

```text
src/database/sqlflow/sqlJsonFileTicket.adapter.js
```

## Connect A Real NoSQL Database

Create a new adapter in:

```text
src/database/nosqlflow/
```

Example:

```text
src/database/nosqlflow/mongoTicket.adapter.js
```

Configure `.env`:

```env
DATA_SOURCE=database
DB_FLOW=nosql
DB_ADAPTER_PATH=./src/database/nosqlflow/mongoTicket.adapter.js
NOSQL_CONNECTION_STRING=mongodb://localhost:27017
NOSQL_DATABASE_NAME=ticketing
NOSQL_TICKETS_COLLECTION=tickets
```

Use this example file as a guide:

```text
src/database/nosqlflow/customNoSqlTicket.adapter.example.js
```

## Connect A Real SQL Database

Create a new adapter in:

```text
src/database/sqlflow/
```

Example:

```text
src/database/sqlflow/postgresTicket.adapter.js
```

Configure `.env`:

```env
DATA_SOURCE=database
DB_FLOW=sql
DB_ADAPTER_PATH=./src/database/sqlflow/postgresTicket.adapter.js
SQL_CONNECTION_STRING=postgres://user:password@localhost:5432/ticketing
SQL_TICKETS_TABLE=tickets
```

Use this example file as a guide:

```text
src/database/sqlflow/customSqlTicket.adapter.example.js
```

## Adapter Contract

Every SQL or NoSQL adapter must export `createTicketAdapter(config)` and return an object with these methods:

```js
findAll(filters)
findById(id)
create(ticket)
update(id, ticket)
delete(id)
```

Because every adapter follows the same contract, the route, controller, and service code does not change when you switch databases.
