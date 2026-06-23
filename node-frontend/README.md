# Node Frontend - Customer Ticketing UI

This folder contains the React frontend for the customer ticketing system. It connects to the Node.js backend in `../node-backend` and lets users create, view, update, filter, and delete tickets.

## Tech Used

- React 18
- Vite
- JavaScript
- CSS
- Fetch API for backend calls

## What This Frontend Does

- Shows all tickets
- Filters tickets by status
- Shows correct ticket counts for each status
- Creates new tickets
- Edits existing tickets
- Deletes tickets
- Views ticket details
- Shows backend health status

## Folder Structure

```text
node-frontend/
├── src/
│   ├── api/
│   │   └── ticketApi.js          # All backend API calls
│   ├── components/
│   │   ├── ServerStatus.jsx      # Backend status display
│   │   ├── TicketCard.jsx        # Ticket card UI
│   │   ├── TicketFilters.jsx     # Status filter tabs
│   │   └── TicketForm.jsx        # Create/edit form
│   ├── App.jsx                   # Main app state and API integration
│   ├── config.js                 # API URL config
│   ├── constants.js              # Status and priority values
│   ├── main.jsx                  # React entry point
│   └── styles.css                # App styling
├── .env.example                  # Example frontend config
├── index.html
├── package.json
└── vite.config.js
```

## Setup

Install Node.js 18 or newer first.

From the project root:

```powershell
cd node-frontend
npm install
Copy-Item .env.example .env
```

On macOS/Linux:

```bash
cd node-frontend
npm install
cp .env.example .env
```

## Start The Frontend

Before starting the frontend, start the backend in another terminal:

```powershell
cd node-backend
npm install
Copy-Item .env.example .env
npm run dev
```

Then start the frontend:

```powershell
cd node-frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:5174
```

## Backend Connection

By default, the frontend calls:

```env
VITE_API_BASE_URL=/api
VITE_HEALTH_URL=/health
```

During local development, `vite.config.js` proxies these requests to the backend:

```text
http://localhost:8080
```

This means the browser can call `/api/tickets`, and Vite sends it to `http://localhost:8080/api/tickets`.

## API Calls Used By Frontend

The frontend integrates these backend APIs:

| Method | Endpoint | Use |
| ------ | -------- | --- |
| GET | `/health` | Check backend status |
| GET | `/api/tickets` | Load all tickets |
| GET | `/api/tickets?status=OPEN` | Filter tickets |
| GET | `/api/tickets/:id` | View one ticket |
| POST | `/api/tickets` | Create ticket |
| PUT | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |

## Change Backend URL

For local development, keep:

```env
VITE_API_BASE_URL=/api
VITE_HEALTH_URL=/health
```

For a deployed backend, use full URLs:

```env
VITE_API_BASE_URL=https://your-api.example.com/api
VITE_HEALTH_URL=https://your-api.example.com/health
```

Restart the frontend after changing `.env`.

## Backend Modes Supported

The frontend works with all backend modes:

```text
Mock mode:          DATA_SOURCE=mock
SQL JSON mode:      DATA_SOURCE=database + DB_FLOW=sql + DB_CLIENT=sql-json-file
SQL ORM mode:       DATA_SOURCE=database + DB_FLOW=sql + DB_CLIENT=sequelize
NoSQL JSON mode:    DATA_SOURCE=database + DB_FLOW=nosql + DB_CLIENT=json-file
MongoDB ODM mode:   DATA_SOURCE=database + DB_FLOW=nosql + DB_CLIENT=mongoose
```

No frontend code changes are needed when switching backend modes.

## Useful Commands

```bash
npm run dev      # Start local frontend server
npm run build    # Build production files
npm run preview  # Preview production build locally
```

## Normal Local URLs

```text
Backend:  http://localhost:8080
Frontend: http://localhost:5174
```
 