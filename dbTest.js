const mongoose = require('mongoose');
mongoose.connect('mongodb://115.28.16.154:27017/test');

function dbCRUD() {
	
	let codeSchema = mongoose.Schema({
	    code: String
	});

	this.model = mongoose.model('Code', codeSchema);

}

dbCRUD.prototype.create = function(opts) {

	let that = this;

	let db = mongoose.connection;

	let obj = new that.model({
		code: opts.code
	});

	obj.save(function (err, obj) {

 		if (err) return console.error(err);

 		console.log(obj.code);
	});

};

module.exports = dbCRUD;

