install:
	npm i

open:
	webstorm .

setup: install
	open

cypress-open:
	npx cypress open

cypress-headless:
	npx cypress run

e2e:
	start-server-and-test dev http://localhost:3000 cypress

e2e-headless:
	start-server-and-test dev http://localhost:3000 cypress-headless
