## Installation
git clone 후 server단 루트 폴더에서 

```bash
$ make
```
nix-shell 기반이기에 npm i 불필요

## Running the app

```bash
순서가 중요하므로 순서대로 실행 할 것.

# docker-compose run and seed insert
$ make dev-reinitialize

# copy type files and watch mode
$ make watch

# make API interface in admin and front
$ make gen-interface

```

## Test (테스트 코드 작성 x)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
