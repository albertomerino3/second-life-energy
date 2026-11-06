# Second Life Energy

## Introduction

This is an educational web platform that gives electronic materials and components a second life through reuse in kits, activities and learning resources.

This is a school project developed by 2nd-year DAW-T students at IES El Rincón (modules DOR and DSW), based on the specifications of the "Second Life Energy" project coordinated at IES La Guancha. Approved by the Directorate-General for Vocational Training and Special Regime Education — Resolution No. 292/2026 (Volume 1, Book 570, 30/06/2026).

The backend uses TypeScript, Express, Sequelize and PostgreSQL. The frontend will use TypeScript, React and Vite.

## Setup and development

### 1. Prerequisites

Install Git, Node.js 22.12+ with npm, and PostgreSQL. Make sure the PostgreSQL server is running before starting the backend.

### 2. Clone the repository

```bash
git clone --branch develop https://github.com/albertomerino3/second-life-energy.git
cd second-life-energy/backend
```

### 3. Environment variables

The backend reads `backend/.env.development` (local values: `localhost:5432`, user `postgres`, password `1234`). Change them if your PostgreSQL uses other credentials. In production the variables come from the environment (see `.env.production.example`).

### 4. Install dependencies and create the database

```bash
npm ci
npm run db:create
npm run db:migrate
npm run db:seed
```

### 5. Start the backend

```bash
npm run dev
```

The API runs at [http://localhost:3000/api](http://localhost:3000/api), for example [http://localhost:3000/api/articles](http://localhost:3000/api/articles).

## Database

- **Migrations** (`backend/database/migrations`): one migration per table of the ERD, ordered so that each table is created after the tables it references. Revert them with `npm run db:migrate:undo:all`.
- **Seeders** (`backend/database/seeders`): demo data for every table (users and roles, kits and components, requests, resources, forum, simulations...). Demo users use the password `Demo1234!`.
- `npm run db:reset` reverts and runs again all the migrations and seeders.

## API

Each module in `backend/src/modules` has its model, service, controller and routes, with the basic CRUD:

```text
GET    /api/<module>        GET    /api/<module>/:id
POST   /api/<module>        PUT    /api/<module>/:id        DELETE /api/<module>/:id
```

Modules: users, roles, permissions, user-roles, role-permissions, invitations, article-categories, articles, kit-components, article-images, stock-movements, requests, request-items, resources, tags, resource-tags, article-resources, forum-categories, questions, answers, moderations, simulations, simulation-articles, simulation-resources, article-reviews and audit-logs.

The relationships between entities are defined in `backend/src/models/associations.ts` and the services use them in their queries (`include`). Some lists accept filters, for example `/api/articles?type=component&available=true` or `/api/resources?type=pdf`.

## Bruno

The endpoints are documented and tested in `backend/docs/second-life-energy.json`. Import it in Bruno (*Import Collection → Postman Collection*), start the backend and run the collection.

## Recommended links

- [Express documentation](https://expressjs.com/) — routing, middleware, and backend APIs.
- [Sequelize v6 documentation](https://sequelize.org/docs/v6/) — models and database queries.
- [PostgreSQL documentation](https://www.postgresql.org/docs/) — database server.
- [Bruno documentation](https://docs.usebruno.com/) — API client.
- [npm ci documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci/) — installing dependencies from a lockfile.
