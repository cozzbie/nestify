# inocalf

A small CLI parser built with ❤ with [Nodejs](https://nodejs.org/en/).

`inocalf <nest1> <nest2> <nest3>`

## Getting started

- Clone the repository. If you are receiving this as a `bundle`, please run `git clone <bunlde file>`.
- Install [Docker](https://www.docker.com/) if you do not already have it. This is very OS dependent so please find your appropriate OS specific version.
- `cd` into the repository

## Running the application

#### As a base repo

- Install [Node](https://nodejs.org/en/) which also installs `npm`.
- `cd` into the project and run `npm link`
- Run `cat <path to input.json file> | inocalf <nest1> <nest2> <nest3>`

#### With Docker

- Ensure Docker is installed as per instructions under [Getting Started](#getting-started)
- Run `docker build -t inocalf .` which provisions an image.

From this you have several options to perform your operations:

- You can run `docker run -i inocalf 'cat'` which starts a container and keeps it running. From here all you have to do is `ssh` into the container by running `docker exec -it <container name> bash` and run your test against `inocalf <nest1> <nest2> <nest3>`.

OR

- Pipe `cat <path to json file>| docker run -i -a stdin -a stderr inocalf inocalf <nest1> <nest2> <nest3>` to run the container and execute your input.

### Notes

I really wanted to have a single command that runs `cat`ed files from the host even if execution was being done via Docker. I had never done this before so this took a bit to figure out.
