.PHONY: bootstrap

bootstrap:
	mise install
	corepack enable yarn
	yarn install
