# React Ticketing Frontend

React + Vite client for the Node.js ticketing API in `../node-backend`.

## Folder Split

```text
PR/
├── node-backend/     # Express MVC API
└── node-frontend/    # React client for the Node API
```

## Run Locally

Start the backend first:

```powershell
cd ../node-backend
npm install
Copy-Item .env.example .env
npm run dev
```

Then start this frontend in another terminal:

```powershell
cd ../node-frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Open:

```text
http://localhost:5174
```

## API Integration

The frontend calls these backend endpoints:

```text
GET    /health
GET    /api/tickets
GET    /api/tickets?status=OPEN
GET    /api/tickets/:id
POST   /api/tickets
PUT    /api/tickets/:id
DELETE /api/tickets/:id
```

During development, `vite.config.js` proxies `/api` and `/health` to:

```text
http://localhost:8080
```

## Configure API URL

Default `.env`:

```env
VITE_API_BASE_URL=/api
VITE_HEALTH_URL=/health
```

For a deployed backend, use full URLs:

```env
VITE_API_BASE_URL=https://your-api.example.com/api
VITE_HEALTH_URL=https://your-api.example.com/health
```

## Backend Modes

The frontend does not change when the backend changes mode. It works with:

```text
DATA_SOURCE=mock
DATA_SOURCE=database + DB_FLOW=sql
DATA_SOURCE=database + DB_FLOW=nosql
```

Only the backend `.env` changes.
