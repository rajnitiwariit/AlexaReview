# alexa review

## Data Import

```bash
cd "C:\Program Files\MongoDB\Tools\100\bin\"
import:  .\mongoimport.exe --host 127.0.0.1 --port 27017 --db nest  --collection reviews --drop --type json --file C:\Rajni\review-api\alexa.json --jsonArray
```

## Installation

```bash
$ npm install
```

## Set environment

```
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

There is a `docker-compose.yml` file for starting MongoDB with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Url Swagger for Api Documentation
```
http://127.0.0.1:3000/api/doc
```
