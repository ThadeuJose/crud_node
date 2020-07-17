const sqlite3 = require('sqlite3').verbose();

function connect(){
	return new sqlite3.Database('./database/production.db',  (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the database.');
	});

}

exports.setUpTable = function() {
	const create_query = 'CREATE TABLE IF NOT EXISTS quote (id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT NOT NULL)';
	let db = connect();
	db.run(create_query);
	db.close();
};

exports.insertQuote = function(quote) {
	let db = connect();
	const insert_query = 'INSERT INTO quote (quote) VALUES(?)';
	db.run(insert_query, [ quote ], function(err) {
	 if (err) {
		 console.log(err.message);
	 }
	 console.log(`A row has been inserted with row id ${this.lastID}`);
 });
 db.close();
};

exports.readAllQuotes = function() {
	let db = connect();
	return new Promise(function(resolve, reject) {
		const read_query = 'SELECT * FROM quote ORDER BY id';
		db.all(read_query, [], (err, rows) => {
			if (err) {
				console.log(err.message);
				reject(err);
			}
			let resp = [];
		  rows.forEach((row) => {
		    resp.push(row);
		  });
			resolve(resp);
			db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				console.log('Closed database');
			});
		});
	});

};
