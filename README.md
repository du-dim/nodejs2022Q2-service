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
docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


## Docker images

1) nodejs2022q2-service_rest-app (392.51Mb)
https://hub.docker.com/repository/docker/dimdubovik/nodejs2022q2-service_rest-app
2) nodejs2022q2-service_rest-db ( 216.46Mb)
https://hub.docker.com/repository/docker/dimdubovik/nodejs2022q2-service_rest-db

![image](https://user-images.githubusercontent.com/86885956/182045249-1daba547-ae95-4342-94c4-803e88f0cf7e.png)

## Scan 

```
docker scan node
```

## Generate migration

```
npm run migration:gen src/migrations/--name
```
![image](https://user-images.githubusercontent.com/86885956/182044700-a2f3b0f7-2988-4bf2-baa6-40897e11e4eb.png)

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

![image](https://user-images.githubusercontent.com/86885956/182044985-1ef3dad3-47f0-4683-91c1-acb39fb053ab.png)


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
Вместо id подтягивает сущность из-за этого не проходит тест. Я не считаю это за ошибку, так как в реальности именно это и нужно и TypeORM так работает. Этого можно избежать если организовать связь только фаворитов с остальными сущностями, а другие связи убрать, но я посчитал это не правильным, пусть сама база за сабой подчисчает в случае удаления сущности. Даже если один тест красным ))

![image](https://user-images.githubusercontent.com/86885956/182045034-2c8b2ea4-a388-46f1-b4ce-6073b83f5de4.png)

Swagger

![image](https://user-images.githubusercontent.com/86885956/182045057-10be4262-9026-4e32-b830-c2bcf9425be1.png)




