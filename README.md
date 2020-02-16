# ACME API

ACME Persona API supports the ability to store profiles of invented widget buyers’ personas.
This API uses node.js, express, and postgresql.

## API Specifications
**All Profiles**
  GET localhost:3000/profiles

**Profile by Id**
  GET localhost:3000/profiles/{id}

**Create new Profile*** - id for new persona in profiles table is provided in this URL
  POST localhost:3000/profiles/{id}

**Update Profile**
  PUT localhost:3000/profiles/{id}

**Delete Profile**
  DELETE localhost:3000/profiles/{id}


## Setup

### Node.js Setup
install nvm and node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
Open the ~/.bash_profile file, and make sure source ~/.bashrc is written in there somewhere. Restart the terminal.
```bash
nvm install node
nvm use node
```
Inside the developer-evaluation-acme folder, install all dependencies from package.json:
```bash
npm install
```


### Postgresql Database Setup
```bash
brew install postgresql
brew services start postgresql
```

Login to postgres

```bash
pgsql postgres
```

Create user and password.

```bash
CREATE ROLE api_user WITH LOGIN PASSWORD 'password';
ALTER ROLE api_user CREATEDB;
```
Login as newly created user.

```bash
\q
psql -d postgres -U api_user
```

Create database
```bash
CREATE DATABASE personas_api;
\c personas_api
```


Run the **init.sql** script in the database to setup tables.



### Run server
Start server at localhost:3000

```bash
node server.js
```

Use Postman to test calls to API.
