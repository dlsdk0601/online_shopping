open: setup
	nix-shell --run 'webstorm .'

setup:
	nix-shell --run 'npm i'

watch:
	nix-shell --run 'npm run watch'

cypress-open:
	npx cypress open

cypress-headless:
	npx cypress run

e2e:
	start-server-and-test dev http://localhost:3000 cypress

e2e-headless:
	start-server-and-test dev http://localhost:3000 cypress-headless
