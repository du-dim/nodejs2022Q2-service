# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/du-dim/nodejs2022Q2-service.git
or
Download ZIP
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up -V --build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Generate migration

```
npm run migration:gen src/migrations/--name
```

## Run migration

```
npm run migration:load
```
![image](https://user-images.githubusercontent.com/86885956/182044845-c32a841a-d963-4906-b190-cfc1df634b2b.png)

## Revert migration

```
npm run migration:back
```

## After migration

![image](https://user-images.githubusercontent.com/86885956/183312103-f1fa78bf-70d7-4bf0-80d2-971d139d424c.png)


## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```
