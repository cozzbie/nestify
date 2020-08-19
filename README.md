# inocalf

A small CLI parser built with ❤ with [Nodejs](https://nodejs.org/en/).

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
- Run `docker run -it inocalf bash 'inocalf <nest1> <nest2> <nest3> < cat <input.json file>'` to run the container and execute your input.

### Notes

I really wanted to have a single command that runs `cat`ed files from the host even if execution was being done via Docker. I had never done this before so this took a bit to figure out.
