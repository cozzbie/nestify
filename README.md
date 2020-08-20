# nestify

## TASK ONE

A small JSON parser built with ❤ with [Nodejs](https://nodejs.org/en/) based on rules loosly seen in the dumps files between the input and the output json files.

`nestify <nest1> <nest2> <nest3>`

### Getting started

- Clone the repository. If you are receiving this as a `bundle`, please run `git clone -b master <bunlde file>`.
- Install [Docker](https://www.docker.com/) if you do not already have it. This is very OS dependent so please find your appropriate OS specific version.
- `cd` into the repository

### Running the CLI application

#### As a base repo

- Install [Node](https://nodejs.org/en/) which also installs `npm`.
- `cd` into the project and run `npm link`
- Run `cat <path to input.json file> | nestify <nest1> <nest2> <nest3>`

#### With Docker

- Ensure Docker is installed as per instructions under [Getting Started](#getting-started)
- Run `docker build -t <image name> .` which provisions an image.

From this you have several options to perform your operations:

- You can run `docker run -ip 2020:2020 <image name>` (the port references are for [Task Two](#task-two)) which starts the container and keeps it running. From here all you have to do is `ssh` into the container by running `docker exec -it <container name> bash` and run your test against `nestify <nest1> <nest2> <nest3>`.

OR

- Pipe `cat <path to json file> | docker run -i -a stdin -a stderr <container name> nestify <nest1> <nest2> <nest3>` to run the container and execute your input.

## TASK TWO

Keeping your docker container running...

- Point your GUI API tool eg [Postman](https://www.postman.com/) to `localhost:2020`
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

## TESTS

- Run `docker run -t <container name> npm test`

### Notes and Excerpts

- Basic Auths value should be the same as the `curl` example else a `401` response is thrown.

The following commands are useful:

- Building your image: `docker build -t <image name> .`
- Starting your container: `docker run -ip 2020:2020 <image name>`
- Stopping your container: `docker stop <container name>`
- Running arbitrary commands against your container: `docker run -t <container name> <list of commands>`
- `<image name>` and `<container name>` are user defined. `<container name>` can be seen by `docker ps` after running an image (`docker run <image name>`).
- Outputs are not sorted like `output.json`

## Thoughts

- It would be nice to have all the possible executions specified in `docker-compose` files. However these are mainly nice if rules were pre-specified and concrete
- Hardest part is always being in the know of how users would interact with this. As a base repo using `npm link`? Via Docker? Would they pipe values into the container or `ssh` into them and run their commands?
- Current implementation uses an `n x m` approach. It would be nice if suggestions could be made as to how to make this `O(n)` but having arbitrary nestings makes this a none trivial task.
