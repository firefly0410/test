const dbCRUD = require('./dbTest');
let db = new dbCRUD({
	code:'test123'
});

db.create();