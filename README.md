<h1>SUBSCRIPTIONS</h1>

## Description micro-services

```
+--------+      +----------------+      +---------------+
|        |----->|                |----->|               |
| gateway|<-----| subscription   |<-----| mail service  |
|        |<-----|                |      |               |
+--------+      +----------------+      +---------------+
```

- Related repositories

  - [gateway](https://github.com/luisMla/gateway-acc)
  - [mail](https://github.com/luisMla/mails-acc)

- subscriptions

  - Service in charge of the treatment and data of the subscriptions.
  - The data is stored in a `mariadb` database, this system has been chosen, since in the future a relational system between users and subscriptions may be necessary.
  - To facilitate the tests together with the integration of TypeORM in the environment, the synchronize parameter has been set to true, this allows that when installing the project the database is created automatically, for production environments it is better to use migrations.
  - system alive:

    - this endpoint is placed in root service in `http://localhost:3000/alive`

  - Structure of auth services:

    - auth controller:
      - Fulfills the following functions: registration, login, and retrieval of logged user data.
        - register.
        - login.
        - me.

  - Structure of subscription services:
    - public controller:
      - This controller enables two methods to create and cancel subscriptions, it needs authorization through the X-API-KEY.
    - private controller:
      - This driver enables the query of subscriptions both by ID and general paged search and send email for newsletter. Requires authentication with JWT and X-API-KEY and ROLES to prevent the access to sensitive information from subscribers or actions.
  - Securitization.

    - Roles Guard.
      - Verify the request user have any role defined in Roles decorator.
    - X pai key guard
      - Verify if the header is present and validate the key
    - JWT guard.
      - Verify if Bearer token is valid and not expired

  - log system:

    - The errors will be wrapped with customErrorLogger, its a function to handle errors, and will be logged with `winston` for now only have console transport integration.
      - ```js
        // Example implementation
        const logger = customErrorLogger('name service or controller here'); // it return a function
        //inside the catch
        logger(err); // it log your error
        ```

## Start Guide

- use node v14.16.1

### Inside Docker containers

Create docker network

```bash
$  docker network create -d bridge expose_apis
```

Just run already prepared bash script:

```bash
$ ./init
```

It will setup the project for you (starting docker-compose stack, running migrations).
The NestJS app running in dev mode will be exposed on `http://localhost` (port 3000)

For IDE autocompletion to work, run `yarn` on the host machine.

## TypeORM integrated

[TypeORM](http://typeorm.io/) gives you possibility to use next db types:
`mysql`, `postgres`, `mariadb`, `sqlite`, etc. Please look at docs for more details.
The `docker-compose` template uses `mariadb`.

## Migrations

If you don't work on a production-ready project you can always change `DB_SYNC` env variable to true so you can play with NestJS without the need to write actual migrations.

**`synchronize: true` shouldn't be used in production - otherwise, you can lose production data.**

### Create Migration

Creating new migration is relatively easy and you can use typeorm CLI for that. You can run this command to create new migration:

```bash
$ docker exec -it nest yarn migration:create -n {CreateTableUsers}
```

Migration file will be placed under `src/migrations`. For more details check the existing [1611484925515-CreateUsersTable.ts](src/migrations/1611484925515-CreateUsersTable.ts)

### Run Migrations

```bash
$ docker exec -it subscriptions yarn migration:run
```

### Revert Migrations

```bash
$ docker exec -it subscriptions yarn migration:revert
```

## Test

```bash
# unit tests
$ docker exec -it subscriptions yarn test

# test coverage
$ docker exec -it subscriptions yarn test:cov
```

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit http://localhost:3000/api/docs

## Authentication - JWT

Already preconfigured JWT authentication.
It's suggested to change current password hashing to something more secure.
You can start use already working implementation of `Login` and `Registration`
endpoints, just take a look at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Authentication - X-API-KEY

This is an internal service, it should only receive requests from the gateway

## CI/CD

In a enterprise environment the process should be:

Make a commit to a branch with a label like "deploy", Jenkins performs a git pull of the branch, performs the build, launches the tests, if everything is correct, reset the corresponding pm2 processes. Finally, if everything went well, you should send a confirmation email.
