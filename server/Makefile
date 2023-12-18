open: setup
	nix-shell --run 'webstorm .'

setup:
	nix-shell --run 'npm i'

revision:
	npm run typeorm:generate

create:
	npm run typeorm:create

upgrade:
	npm run typeorm:upgrade

downgrade:
	npm run typeorm:downgrade

dev:
	docker compose up -d
	sleep 1

dev-clean:
	docker compose down -v --rmi local
	sleep 1

import-faker: upgrade
	npm run seed

dev-restart: dev-clean dev
	npm run typeorm:upgrade

dev-reinitialize: dev-clean dev import-faker

watch:
	nodemon --watch src bin/copiedTypes.ts bin/tempDelete.ts

run:
	npm run start:dev

gen-interface:
	ts-node ./bin/binApiInterface.ts


