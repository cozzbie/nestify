# nestify - TASK ONE

A small CLI parser built with ❤ with [Nodejs](https://nodejs.org/en/).

`nestify <nest1> <nest2> <nest3>`

## Getting started

- Clone the repository. If you are receiving this as a `bundle`, please run `git clone <bunlde file>`.
- Install [Docker](https://www.docker.com/) if you do not already have it. This is very OS dependent so please find your appropriate OS specific version.
- `cd` into the repository

## Running the application

#### As a base repo

- Install [Node](https://nodejs.org/en/) which also installs `npm`.
- `cd` into the project and run `npm link`
- Run `cat <path to input.json file> | nestify <nest1> <nest2> <nest3>`

#### With Docker

- Ensure Docker is installed as per instructions under [Getting Started](#getting-started)
- Run `docker build -t <image name> .` which provisions an image.

From this you have several options to perform your operations:

- You can run `docker run -ip 2020:2020 <image name>` which starts the container and keeps it running. From here all you have to do is `ssh` into the container by running `docker exec -it <container name> bash` and run your test against `nestify <nest1> <nest2> <nest3>`.

OR

- Pipe `cat <path to json file> | docker run -i -a stdin -a stderr <container name> nestify <nest1> <nest2> <nest3>` to run the container and execute your input.

### Notes

- `<image name>` and `<container name>` are user defined. `<container name>` can be seen by `docker ps` after running an image (`docker run <image name>`).
- Outputs are not sorted like `output.json`

# TASK TWO

Keeping your docker container running...

- Point your API tool eg [Postman](https://www.postman.com/) to `localhost:2020`
- Ensure your`'Content-Type'` is set to `'application/json'`
- Optionally you can do this also with `curl`.

A sample curl request would look like

```curl
curl --location --request POST 'localhost:2020/currency/country/city' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "country": "US",
    "city": "Boston",
    "currency": "USD",
    "amount": 100
  },
  {
    "country": "FR",
    "city": "Paris",
    "currency": "EUR",
    "amount": 20
  },
  {
    "country": "FR",
    "city": "Lyon",
    "currency": "EUR",
    "amount": 11.4
  },
  {
    "country": "ES",
    "city": "Madrid",
    "currency": "EUR",
    "amount": 8.9
  },
  {
    "country": "UK",
    "city": "London",
    "currency": "GBP",
    "amount": 12.2
  },
  {
    "country": "UK",
    "city": "London",
    "currency": "FBP",
    "amount": 10.9
  }
]
'
```

### Notes

- Basic Auth:
