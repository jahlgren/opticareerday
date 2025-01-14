# OptiCareer Day

This repository contains a Quiz for the OptiCareer Day event.

## Env

Make sure that you have these set up in your .env:

```
DB_TYPE=mariadb
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

NEXTAUTH_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_API_ENDPOINT=/api
```

## Dev

Initialize and create database schema:

```
npm run migrations-up
```

Start dev server:

```
npm run dev
```
