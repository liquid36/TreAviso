        
function DB (name) {
	this.name = name;
	this.db = window.sqlitePlugin.openDatabase({name: this.name, bgType: 1});
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY AUTOINCREMENT,recordedAt TEXT, accuracy TEXT,speed TEXT,latitude TEXT,longitude TEXT');
		tx.executeSql('CREATE TABLE IF NOT EXISTS alarm    (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, active INTEGER, metros INTEGER, latitude TEXT, longitude TEXT,  path TEXT');
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
	
}
 
DB.prototype.addAlarm = function(al) {
    db.transaction(function(tx) {
		tx.executeSql('INSERT INTO alarm (name,active,metros,latitude,longitude,path) VALUES(?,?,?,?,?,?,?)' , [al.name,al.active,al.metros,al.latitude,al.longitude,al.path] ));
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
};

DB.prototype.updateAlarm = function(al) {
    db.transaction(function(tx) {
		tx.executeSql('UPDATE  alarm SET name = ? , active = ?  , metros = ? , latitude = ?  , longitude = ? , path = ? WHERE id = ?) VALUES(?,?,?,?,?,?,?)' , [al.name,al.active,al.metros,al.latitude,al.longitude,al.path,al.id] ));
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
}; 

DB.prototype.deleteAlarm = function(al) {
    db.transaction(function(tx) {
		tx.executeSql('DELETE alarm WHERE id = ?' , [al.id]));
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
}; 

DB.prototype.changeActiveAlarm = function(al) {
    db.transaction(function(tx) {
		tx.executeSql('UPDATE alarm SET active = ? WHERE id = ?' , [al.active,al.id]));
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
};

DB.prototype.getAllAlarm = function(callBack) {
    db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM alarm;", [], function(tx, res) { 
			var r = [];
			for(int i = 0; i < res.rows.length ; i++)
				r.push( res.rows.item(0) );
			callBack(r);	
        });
	}, function(e) {
		console.log("ERROR: " + e.message);
    });
};
