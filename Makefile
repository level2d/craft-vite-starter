include .env

.PHONY: build dev install up update

build: up
	ddev yarn build

dev: up
	ddev yarn dev

update: up
	ddev composer update
	ddev craft migrate/all --interactive=0
	ddev craft project-config/apply --interactive=0
	ddev craft clear-caches/compiled-templates --interactive=0
	ddev craft clear-caches/cp-resources --interactive=0
	ddev craft clear-caches/data --interactive=0

install: up build
	ddev craft setup/security-key
	ddev craft setup/db-creds --interactive=0 --database=db --user=db --password=db
	ddev craft install --interactive=0 --email=${EMAIL} --username=${USERNAME} --password=${PASSWORD} --siteName=${SITENAME} --siteUrl=${PRIMARY_SITE_URL}
	ddev craft project-config/apply

up:
	if [ ! "$$(ddev desc | grep OK)" ]; then \
		ddev start; \
		ddev composer install; \
		ddev yarn install; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line