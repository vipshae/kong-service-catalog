## Kong Service Catalog API

Kong Service Catalog API for implementing services dashboard widget. 

This project uses nest.js to create an express webserver which serves the following CRUD functionalities and their respective APIs:

- Returning a list of services: `GET /api/services`
- support filtering, sorting, pagination: `GET /api/services?page=1&limit=5&name=kong&sort_by=asc`
- Fetching a particular service: `GET /api/services/:id`
- including a method for retrieving its versions: `GET /api/services/:id/versions`

## Project setup

To install packages and initialize the db. This will use docker-compose to spin up a postgres container

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


## Formatting and Linting

Code Liniting and formatting is supported using `eslint` and `prettier` respectively.

```bash
# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```