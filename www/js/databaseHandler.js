var databaseHandler = {
db: null, count: null,
createDatabase: function(){
    this.db = window.openDatabase(
        "rates.db",
        "1.0",
        "rates database",
        5 * 1024 * 1024);
    this.db.transaction(
        function(tx){
            //Run sql here using tx
            tx.executeSql(
                "create table if not exists rates(_id integer primary key, rName text, rType text, rDate date, rPrice float,rService float,rClean float,rQuality float,rNote text, rReporter text )",[],
                function(tx, results){},
                function(tx, error){
                    console.log("Error creating table: " + error.message);
                }
            );
        },
        function(error){
            console.log("Error: " + error.message);
        },
        function(){
            console.log("Create DB successfully");
        }
    );

}
}

