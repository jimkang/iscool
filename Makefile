test:
	node tests/iscool-tests.js

pushall:
	git push origin master && npm publish

update-dependents:
	cd ../can-i-chime-in && make update-iscool && make test
	cd ../nounfinder && make update-iscool
	cd ../godtributes && make update-iscool-and-chime-in
	cd ../linkfinds && make update-iscool-and-chime-in
	cd ../transform-word-bot && PROJECTNAME=improvebot make update-iscool

prettier:
	prettier --single-quote --write "**/*.js"

