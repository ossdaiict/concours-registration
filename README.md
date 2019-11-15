# Concours Registration

Web application for Concours (DA-IICT Sports Festival) registrations.

## Development Instructions

This application uses a NodeJS Express Server (server folder) and a ReactJS frontend (client folder) and uses yarn workspaces to manage intra dependencies. [MongoDB](https://www.mongodb.com/) is used for database operations and [SendGrid](https://sendgrid.com/) is used to send emails.

You need Node & Yarn to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

You also need to setup `.env` files in both the client and server folders:

- For the client:

  ```bash
  REACT_APP_API_URL=#(Optional; defaults to http://localhost:5000) Your backend server url
  ```

- For the server:

  ```bash
  DB_URL=#mongodb url
  DB_NAME=#database name
  SENDGRID_API_KEY=#SendGrid API key
  PASSWORD=#password for registration admin
  ```

To run the development server of the client, use:

```bash
yarn client:start
```

To run the backend server in development, use:

```bash
yarn server:dev
```

### Other Scripts Available:

- Building a production version of the client:

```bash
yarn client:build
```

- Building a production version of the server:

```bash
yarn server:build
```

- Starting the production version of the server:

```bash
yarn server:start
```
