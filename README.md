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
# docker up and running 
$ docker-compose build 
$ docker-compose up

# how to find docker image name 
$ docker ps
# could be something like profit-shared-system-api-1

# run this command in another terminal 
$ docker exec -it YOUR-DOCKER-IMAGE-NAME npx prisma db push
```