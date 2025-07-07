## Kong Service Catalog API

Kong Service Catalog API for implementing services dashboard widget. 

This project uses nest.js to create an express webserver which serves the following CRUD functionalities and their respective APIs:

- Returning a list of services: `GET /api/services`
- support filtering, sorting, pagination: `GET /api/services?page=1&limit=5&name=kong&sort_by=asc`
- Fetching a particular service: `GET /api/services/:id`
- including a method for retrieving its versions: `GET /api/services/:id/versions`

## Project setup

To install packages and initialize the db and run migrations to seed the tables. This will also use docker-compose to spin up a postgres container.

```bash
$ npm install
```

## DB migrations

### Create migration

To create new migration ex: newMigration

```bash
npm run typeorm -- migration:create src/migrations/newMigration
```

### Run migrations

To add db schema and seed the tables

```bash
npm run migration:run
```

## Compile and run the project locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Formatting and Linting

Code Liniting and formatting is supported using `eslint` and `prettier` respectively.

```bash
# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```

## Project Stack

The project is using the following tech stack:
- Postgres (v15)
- Node.js (v22)
- Nest.js (v11.0.1)
- TypeORM (v0.3.25)
- TypeScript (v0.5.7.3)

For testing it uses:
- jest
- supertest

## Design methodology

This project follows a modular and maintainable architecture using NestJS best practices:

- **DTOs (Data Transfer Objects):** Used for request validation and response shaping, ensuring type safety and input validation.
- **Controllers:** Handle HTTP requests and responses, delegating business logic to services.
- **Services/Providers:** Contain business logic and orchestrate operations between controllers and repositories.
- **Entities:** Define the database schema using TypeORM, representing the core business models.
- **Repositories:** Encapsulate all data access logic, providing a clean separation between the business/domain layer and the persistence/data layer.

This separation of concerns ensures:
- Clean, testable, and maintainable code.
- Easy scalability and extensibility.
- Clear boundaries between business logic and data access.

The project structure is motivated by the [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) principles and leverages NestJS’s dependency injection for loose coupling between components.
