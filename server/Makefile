open:
	webstorm .

install:
	npm i

setUp: install
	open

revision:
	npm run typeorm:generate

upgrade:
	npm run typeorm:upgrade

downgrade:
	npm run typeorm:downgrade

dev:
	docker compose up -d
	sleep 1

dev-clean:
	 docker compose down -v --rmi local

import-faker: upgrade
	npm run seed

dev-reinitialize: dev-clean dev import-faker

gen:
	ts-node ./bin/copiedTypes.ts
	ts-node ./bin/tempDelete.ts

watch: gen
	npm run start:dev

gen-interface:
	ts-node ./bin/binApiInterface.ts

