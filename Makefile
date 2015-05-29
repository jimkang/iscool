test:
	node_modules/mocha/bin/mocha --ui tdd tests/iscool-tests.js

pushall:
	git push origin master && npm publish
