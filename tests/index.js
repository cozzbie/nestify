const chai = require('chai');
const expect = chai.expect;
const app = require('../src');
const chaihttp = require('chai-http');
const server = require('../src/server');
const jsonIn = require('./dumps/input.json');
const jsonOut = require('./dumps/output.json');

chai.use(chaihttp);

const requester = chai.request(server).keepOpen();

describe('Nestify', () => {
	describe('validKeys', () => {
		it('should return an empty array', () => {
			const expected = ['currency', 'country', 'city'];
			const gotten = ['bird', 'dog', 'cat'];
			const valid = app.validKeys;

			expect(valid(expected, gotten).length).to.equal(0);
		});

		it('should return a valid array', () => {
			const expected = ['currency', 'country', 'city'];
			const gotten = ['currency', 'country'];
			const valid = app.validKeys;

			expect(valid(expected, gotten).length).to.equal(2);
		});
	});

	describe('nestify', () => {
		it('should return expected number of outer keys', () => {
			const args = ['currency', 'country', 'city'];
			const nestify = app.nestify;
			const output = nestify({ json: jsonIn, args });

			expect(Object.keys(output).length).to.equal(4);
		});

		it('should return an `Unauthed` message from /', done => {
			requester.get('/')
				.end((e, r) => {
					expect(e).to.be.null;
					expect(r).to.have.status(401);
					expect(r.text).to.equal('Unauthorized.');
					done();
				});
		});

		it('should return a message from /', done => {
			requester.get('/')
				.set('Authorization', 'Basic YWRtaW46YWRtaW4=')
				.end((e, r) => {
					expect(e).to.be.null;
					expect(r).to.have.status(200);
					expect(r.text).to.equal('Please use a POST request to make a Nestify call');
					done();
				});
		});

		it('should return expected output from /<nests>...', done => {
			requester.post('/currency/country/city')
				.set('Authorization', 'Basic YWRtaW46YWRtaW4=')
				.set('Content-Type', 'application/json')
				.send(jsonIn)
				.end((e, r) => {
					expect(e).to.be.null;
					expect(r).to.have.status(200);

					const output = r.body;
					expect(Object.keys(output).length).to.equal(4);

					const outSorted = Array.from(JSON.stringify(output)).sort().join('');
					const jsonOutSorted = Array.from(JSON.stringify(jsonOut)).sort().join('');
					expect(outSorted).to.equal(jsonOutSorted);
					done();
				});
		});
	});
});