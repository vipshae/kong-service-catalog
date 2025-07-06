## Description

Kong Service Catalog API for implementing services dashboard widget. 

This project uses nest.js to create an express webserver which serves the following CRUD functionalities and their respective APIs:

- Returning a list of services: `GET /api/services`
- support filtering, sorting, pagination: `GET /api/services?page=1&limit=5&filter_by=name&sort_by=asc`
- Fetching a particular service: `GET /api/services/:id`
- including a method for retrieving its versions: `GET /api/services/:id/versions`

## Project setup

```bash
$ npm install
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

# test coverage
$ npm run test:cov
```

## Formatting and Linting

Code Liniting and formatting is supported using `eslint` and `prettier` respectively.

```bash
# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```