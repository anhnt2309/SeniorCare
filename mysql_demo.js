var mysql = require('mysql'),
async = require('async');

var PRODUCTION_DB = 'app_prod_db',
TEST_DB ='app_test_db';

exports.MODE_TEST ="mode_test"
exports.MODE_PRODUCTION ="mode_production"

var state = {
	mode:null,
	pool:null,
}

exports.connect = function(mode,done){
	state.pool = mysql.createPool({
		host: "127.0.0.1",
		user: "root",
		password: "",
		port:"3307",
		database: mode == exports.MODE_PRODUCTION? PRODUCTION_DB:TEST_DB
	})

	state.pool.query("CREATE DATABASE IF NOT EXISTS app_prod_db", function (err, result) {
		debugger;
		if (err) throw err;
		debugger;
    // console.log("Database created");
});
	var checkTableSQl = "SHOW TABLES FROM app_prod_db LIKE 'users'";
	state.pool.query(checkTableSQl, function (err, result) {
		if (err) throw err;
  	// console.log(result.length)
  	// if(result ==0 )
  	// 	return 0;


//   	var sql = "CREATE  TABLE IF NOT EXISTS users (id INT primary key, name VARCHAR(255), age INT,timestamp timestamp)";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table USERS created");
//   	});

//   	var sql = "CREATE  TABLE IF NOT EXISTS ads (id INT primary key, ad_url VARCHAR(255), ad_type INT,ad_duration INT)";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table ADS created");
//   	});

// var sql = "CREATE  TABLE IF NOT EXISTS thSensors (id INT NOT NULL AUTO_INCREMENT,event VARCHAR(30), sid varchar(100), temperature FLOAT,huminity FLOAT,timestamp timestamp,PRIMARY KEY (id))";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table thSensors created");
//   	});


// var sql = "CREATE  TABLE IF NOT EXISTS buttonSensors (id INT NOT NULL AUTO_INCREMENT,event VARCHAR(30), sid VARCHAR(100), type VARCHAR(30),timestamp timestamp,PRIMARY KEY (id))";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table buttonSensors created");
//   	});

// var sql = "CREATE  TABLE IF NOT EXISTS motionSensors (id INT NOT NULL AUTO_INCREMENT,event VARCHAR(30), sid VARCHAR(100), type VARCHAR(30),timestamp timestamp,PRIMARY KEY (id))";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table motionSensors created");
//   	});

//   	var sql = "CREATE  TABLE IF NOT EXISTS magnetSensors (id INT NOT NULL AUTO_INCREMENT,event VARCHAR(30), sid VARCHAR(100), closed VARCHAR(30),timestamp timestamp,PRIMARY KEY (id))";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table magnetSensors created");
//   	});

//   	var sql = "CREATE  TABLE IF NOT EXISTS plugSensors (id INT NOT NULL AUTO_INCREMENT,event VARCHAR(30), sid VARCHAR(100), onStatus VARCHAR(30),timestamp timestamp,PRIMARY KEY (id))";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table plugSensors created");
//   	});

// var sql = "CREATE  TABLE IF NOT EXISTS rooms (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(30), sid VARCHAR(100),timestamp timestamp,PRIMARY KEY (id))";
// state.pool.query(sql, function (err, result,fields) {
// 	if (err) throw err;
//   		// console.log(fields); 
//   		// console.log(result);
//   		console.log("Table rooms created");
//   	});


// var sql = "ALTER  TABLE users ADD PRIMARY KEY(id)";
//   	state.pool.query(sql, function (err, result,fields) {
//   		if (err) throw err;
//   		// console.log(fields); 
//   		console.log(result);
//   		console.log("Table USERS Altered");
//   	});


});


	state.mode = mode;
	done()
}

exports.get = function(){
	return state.pool
}

exports.fixtures = function (data,done) {
	// body...
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
		var names = Object.keys(data.tables)
	async.each(names, function(name, done) {
		async.each(data.tables[name], function(row, done) {
			var keys = Object.keys(row)
			// console.log(keys)
			, values = keys.map(function(key) { 
				// console.log("'" + row[key] + "'" )
				return "'" + row[key] + "'" 
			})
			
			pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', done)
		}, done)
	})

}


exports.drop = function(tables, done) {
	var pool = state.pool
	if (!pool) return done(new Error('Missing database connection.'))
		pool.query('DELETE FROM ' + tables, done)
		// async.each(tables, function(name, cb) {
		// 	console.log(name)
		// 	console.log(cb)

		// }, done)
	}

	exports.dropTable = function(table,done){
		var pool = state.getpool
		if(!pool)
			return done(new Error("Missing database connection"))
		pool.query("DROP TABLE "+tables,done)
	}

	exports.dropDatabase = function(table,done){
		var pool = state.getpool
		if(!pool)
			return done(new Error("Missing database connection"))
		pool.query("DROP Database "+PRODUCTION_DB,done)
	}

	exports.addUser = function (data,done) {
	// body...
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
		pool.query('INSERT INTO users VALUES (' + data.id+',"' + data.name+'",'+ data.age+',NOW() +0)', done)

}
exports.addAds = function (data,done) {
	// body...
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
		pool.query('INSERT INTO ads VALUES (' + data.id+',"' + data.ad_url+'",'+ data.ad_type+','+data.ad_duration+')', done)

}

exports.getAll = function(from,done) {
	var pool = state.pool
	debugger;
	if (!pool) return done(new Error('Missing database connection.'))

		pool.query("SELECT * FROM " + from, function (err, result, fields) {
			if (err){ 
				debugger;
				throw err
				
			};
			// console.log(result);
			done(err,result);
			debugger;
		});
}

exports.getUser = function(id,done) {
	var pool = state.pool
	debugger;
	if (!pool) return done(new Error('Missing database connection.'))

		pool.query("SELECT * FROM users WHERE id=" + id, function (err, result, fields) {
			if (err){ 
				throw err
			};
			// console.log(result);
			done(err,result);
		});
}

exports.deleteUser = function (data,done) {
	// body...
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
		pool.query('DELETE FROM users WHERE id=' +data, done)

}

exports.addTemSensor = function (data,done) {
	// body...
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
		pool.query('INSERT INTO thSensors VALUES (0,"' + data.event+'","' + data.sid+'",'+ data.temperature+','+ data.humidity+',NOW() +0)', done)
}

exports.addEventSensor = function (data,done) {
	// body..
	
	var pool = state.pool
	if(!pool) return done(new Error('Missing database connection'))
	var event ="";
	var tableName = data.event+"Sensors";
	if(data.event == 'button' ||data.event == 'motion')
		event = data.type
	if(data.event == 'magnet'){
		tableName = "motionSensors";
		event = data.closed
		}
	if(data.event == 'plug')
		event = data.on



	pool.query('INSERT INTO '+tableName+' VALUES (0,"' + data.event+'","' + data.sid+'","'+ event+'",NOW() +0)', done)
}

var lastedMotionQuery ='SELECT sensor.*,room.name ,room.sid '+
						'FROM motionSensors AS sensor,('+
						                             'SELECT MAX(TIMESTAMP) maxts ' +
						                             'FROM motionSensors '+
						                             'GROUP BY sid '+
						                             ') AS maxtimestamp, rooms  AS room '+

						'WHERE   sensor.timestamp = maxtimestamp.maxts AND sensor.sid = room.sid AND '+
						                                                  '(sensor.id) IN('+
						                                                   'SELECT MAX(id) '+
						                                                   'FROM motionSensors '+
						                                                   'GROUP BY sid) '+
						'ORDER BY id DESC '+
						'LIMIT 1';


exports.getLatestMotion = function(done) {
	var pool = state.pool
	debugger;
	if (!pool) return done(new Error('Missing database connection.'))

		pool.query(lastedMotionQuery, function (err, result, fields) {
			if (err){ 
				throw err
			};
			// console.log(result);
			done(err,result);
			pool.release();
		});
}



