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
	const insert_query = 'INSERT INTO quote (quote) VALUES(?)'
	let db = connect();
	db.run(insert_query, [ quote ], function(err) {
	 if (err) {
		 return console.log(err.message);
	 }
	 // get the last insert id
	 console.log(`A row has been inserted with row id ${this.lastID}`);
 });

 // close the database connection
 db.close();
};
