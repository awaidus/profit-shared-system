## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Docker Setup

```bash
# for development
$ docker-compose up --build

# for production
$ docker-compose -f docker-compose.prod.yml up --build


# run this command in another terminal (if db not sync)
$ docker-compose exec api npx prisma generate
$ docker-compose exec api npx prisma migrate dev
```
