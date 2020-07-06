const sqlite3 = require('sqlite3').verbose();

function connect(){
	let db = new sqlite3.Database('./database/test.db',  (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the database.');
	});

}
