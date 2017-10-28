test:
	node_modules/mocha/bin/mocha --ui tdd tests/iscool-tests.js

pushall:
	git push origin master && npm publish

update-dependents:
	cd ../can-i-chime-in && make update-iscool
	cd ../godtributes && make update-iscool-and-chime-in
	cd ../linkfinds && make update-iscool-and-chime-in
