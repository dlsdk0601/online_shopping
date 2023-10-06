<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ make
```
nix-shell 기반이기에 npm i 불필요

## Running the app

```bash
순서가 중요하므로 순서대로 실행 할 것.

# docker-compose up -d and seed insert
$ make dev-reinitialize

# copy type files and watch mode
$ make watch

# make API interface in admin and front
$ make gen-interface

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
