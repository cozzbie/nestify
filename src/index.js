module.exports = async (args) => {
	const parsed = await parsify(args);
	const output = nestify(parsed);
	process.stderr.write(JSON.stringify(output));
};

/**
 * A function that collects input from stdin
 * parses its value into readable js structures
 * 
 * @param {string[]} args 
 * @returns {Promise}
 */
const parsify = args => {
	return new Promise((resolve, reject) => {
		const stdin = process.openStdin();
		let data = '';

		stdin.on('data', chunk => {
			data += chunk;
		});

		stdin.on('end', () => {
			const output = {
				json: JSON.parse(data),
				args: args.splice(2)
			}
			resolve(output)

		});

		stdin.on('error', () => {
			reject('An error occured while parsing your values. Please retry.')
		});
	});
};


/**
 * This function takes in a single object
 * and begins the nesting operation based off
 * the keys (read as `nesting levels`) passed in
 * 
 * @param {*} { json, keys }
 * @returns output
 */

const nestify = ({ json, args }) => {
	if (!args.length) {
		return json;
	}

	const output = {};

	for (let i = 0; i < json.length; i++) {
		const item = { ...json[i] };

		const keys = validKeys(args, Object.keys(item));

		if (!keys.length) {
			output[i] = item;
			continue;
		}

		let node = output;

		for (let j = 0; j < keys.length; j++) {
			const objOrArr = j == (keys.length - 1) ? [] : {};
			const key = item[keys[j]];
			node = node[key] || (node[key] = objOrArr);
			delete item[keys[j]];
		}

		node.push(item);
	}

	return output;
};

/**
 * Users might request a mixture of valid and invalid
 * nestings or even keys that do not match.
 * This function 'sanitizes' keys and returns
 * only vlaues that are useable
 * 
 * @param {Array} expected 
 * @param {Array} gotten
 * 
 * @returns {Array}
 */
const validKeys = (expected, gotten) => {
	if (!Array.isArray(expected) || !Array.isArray(gotten)) {
		return [];
	}

	return expected.filter(key => gotten.includes(key));
}