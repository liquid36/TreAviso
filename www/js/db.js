(function () {    
    function DB (name) {
        this.name = name;
        console.log(window.sqlitePlugin);
        if(window.sqlitePlugin !== undefined) {
            this.db = window.sqlitePlugin.openDatabase({name: this.name, bgType: 1});
        } else {
            this.db = window.openDatabase(this.name, "0.1", this.name, 1000000);
        }
        this.db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY AUTOINCREMENT, recordedAt TEXT , accuracy TEXT , speed TEXT,     latitude TEXT, longitude TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS alarm    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT       , active INTEGER, metros INTEGER, latitude TEXT, longitude TEXT,  path TEXT)');
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });

    }

    DB.prototype.addAlarm = function(al) {
        this.db.transaction(function(tx) {
            tx.executeSql('INSERT INTO alarm (name,active,metros,latitude,longitude,path) VALUES(?,?,?,?,?,?)' , [al.name,al.active,al.metros,al.latitude,al.longitude,al.path]);
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    };

    DB.prototype.updateAlarm = function(al) {
        this.db.transaction(function(tx) {
            tx.executeSql('UPDATE  alarm SET name = ? , active = ?  , metros = ? , latitude = ?  , longitude = ? , path = ? WHERE id = ?) VALUES(?,?,?,?,?,?,?)' , [al.name,al.active,al.metros,al.latitude,al.longitude,al.path,al.id]);
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    }; 

    DB.prototype.deleteAllAlarm = function(al) {
        this.db.transaction(function(tx) {
            tx.executeSql('DELETE FROM alarm ' , []);
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    }; 

    DB.prototype.deleteAlarm = function(al) {
        this.db.transaction(function(tx) {
            tx.executeSql('DELETE FROM alarm WHERE id = ?' , [al.id]);
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    }; 

    DB.prototype.changeActiveAlarm = function(id,active) {
        this.db.transaction(function(tx) {
            tx.executeSql('UPDATE alarm SET active = ? WHERE id = ?' , [active,id]);
            if(tx.finish !== undefined) {
                tx.finish();
            }
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    };

    DB.prototype.getAllAlarm = function(callBack) {
        this.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM alarm;", [], function(tx, res) { 
                var r = [];
                for(var i = 0; i < res.rows.length ; i++) {
                    r.push( res.rows.item(i) );
                }
                callBack(r);	
            });
        }, function(e) {
            console.log("ERROR: " + e.message);
        });
    };
    
    window.DB = DB;
})();	
