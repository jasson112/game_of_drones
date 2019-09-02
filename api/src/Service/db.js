var mysql = require('mysql');
const yaml = require('js-yaml');
const fs = require('fs');
let config = {};

try {
    config = yaml.safeLoad(fs.readFileSync('config/database.yaml', 'utf8'));
} catch (e) {
    console.log(e);
}

var con = null;

exports.start = function(){
	con = mysql.createConnection({
	  host: config.mysql.host,
	  user: config.mysql.user,
	  password: config.mysql.password,
	  database: config.mysql.database
	});

	//- Error listener
	con.on('error', function(err) {

	    //- The server close the connection.
	    if(err.code === "PROTOCOL_CONNECTION_LOST"){    
	        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
	        con = reconnect(connection);
	    }

	    //- Connection in closing
	    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
	        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
	        con = reconnect(connection);
	    }

	    //- Fatal error : connection variable must be recreated
	    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
	        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
	        con = reconnect(connection);
	    }

	    //- Error because a connection is already being established
	    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
	        con.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
	    }

	    //- Anything else
	    else{
	        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
	        con = reconnect(connection);
	    }

	});
}

//- Reconnection function
function reconnect(connection){
    console.log("\n New connection tentative...");

    //- Destroy the current connection variable
    if(connection) connection.destroy();

    //- Create a new one
    var connection = mysql_npm.createConnection(db_config);

    //- Try to reconnect
    connection.connect(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect, 2000);
        }else {
            console.log("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}



/*
criteria:
{
	table:string,
	fields:[
		string
	],
	where:[
		{
			key:string
		}
	]

}
*/

exports.select = function(criteria, callback) {
	con.connect(function(err) {
		if (err){
			callback(err, null);
		}

		let table = null;
		let fields = '*'
		let where = ''
		
		Object.keys(criteria).forEach(item => {
			if(item == "table"){
				table = criteria[item];
			}else if (item == "fields"){
				fields = criteria[item].join()
			}else if (item == "where"){
				where += "WHERE "
				Object.keys(criteria[item]).forEach(item_where => {
					Object.keys(criteria[item][item_where]).forEach(item_where_inner => {
						where += item_where_inner + " = '" + criteria[item][item_where][item_where_inner] + "'"
					})
				})
			}
		});

		let query = `SELECT ${fields} FROM ${table} ${where}`;

		con.query(query, function (err, result, fields) {
			if (err){
				callback(err, null)
			}

			callback(null, result)
		});
	});
}


/*
criteria:
{
	table:string,
	fields:[
		string
	],
	where:[
		{
			key:string
		}
	],
	values:[
		[string, string]
	]

}
*/
exports.insert = function(criteria, callback) {
	con.connect(function(err) {
		if (err){
			callback(err, null);
		}

		let table = null;
		let fields = '*';
		let values = []
		
		Object.keys(criteria).forEach(item => {
			if(item == "table"){
				table = criteria[item];
			}else if (item == "fields"){
				fields = criteria[item].join()
			}else if(item == "values"){
				values = criteria[item]
			}
		});

		let query = `INSERT INTO ${table} (${fields}) VALUES ?`;
		console.log("ATTEMPT TO INSERT " + query)

		con.query(query,[values], function (err, result, fields) {
			if (err){
				callback(err, null)
			}
			callback(null, result)
		});
	});
}


/*
criteria:
{
	table: "user",
	where: [
		{
		  string: string
		}
	],
	data: [
		{
		  string: string
		}
	]
}
*/
exports.update = function(criteria, callback) {
	con.connect(function(err) {
		if (err){
			callback(err, null);
		}

		let table = null;
		let fields = '*';
		let sets = []
		let where = ''
		
		Object.keys(criteria).forEach(item => {
			if(item == "table"){
				table = criteria[item];
			}else if (item == "data"){
				sets = [];
				for(var i = 0; i < criteria[item].length; i++){
					Object.keys(criteria[item][i]).forEach(field_item => {
						sets.push(`${field_item} = '${criteria[item][i][field_item]}'`)
						
					})
				}
			}else if (item == "where"){
				sets = [];
				where += "WHERE "
				for(var i = 0; i < criteria[item].length; i++){
					Object.keys(criteria[item][i]).forEach(field_item => {
						sets.push(`${field_item} = '${criteria[item][i][field_item]}'`)
					})
				}
				where += sets.join()
			}
		});

		let query = `UPDATE ${table} SET ${sets.join()} ${where}`;

		con.query(query, function (err, result, fields) {
			if (err){
				callback(err, null)
			}
			callback(null, result)
		});
	});
}
