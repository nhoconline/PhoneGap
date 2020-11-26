
var rateHandler={
add: function(irate){
    if(!irate) return;
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "select * from rates where rName=? and rType=? and rDate=? and rReporter=?",
                [irate.rName, irate.rType, irate.rDate, irate.rReporter],
                function(tx,results){
                    count = results.rows.length;
                    if(count == 0){
                        tx.executeSql(
                            "INSERT INTO rates(rName,rType, rDate, rPrice, rService, rClean, rQuality, rNote, rReporter) VALUES (?,?,?,?,?,?,?,?,?)",
                            [irate.rName,irate.rType,irate.rDate,irate.rPrice,irate.rService, irate.rClean, irate.rQuality, irate.rNote, irate.rReporter],
                            function(tx, results){

                                alert("Add rate successfully");
    
                            },
                            function(error){console.log(error)},
                            function(){}
                        );
                    }else{
                        var r = confirm("There were similar object\n" + "Restaurant name: " + irate.rName +"\n"
                        + "Restaurant type: " + irate.rType + "\n"
                        + "Visit Date: "+ irate.rDate + "\n"
                        + "Reporter Name: "+ irate.rReporter + "\n"+ "Do you want to add this?")
                        if(r == true){
                            tx.executeSql(
                                "INSERT INTO rates(rName,rType, rDate, rPrice, rService, rClean, rQuality, rNote, rReporter) VALUES (?,?,?,?,?,?,?,?,?)",
                                [irate.rName,irate.rType,irate.rDate,irate.rPrice,irate.rService, irate.rClean, irate.rQuality, irate.rNote, irate.rReporter],
                                function(tx, results){

                                    alert("Add rate successfully");
                  
                                },
                                function(error){console.log(error)},
                                function(){}
                        );
                        }
                    }
                },
                function(tx, error){
                    console.log("Error find " + error.message);
                })
        });

},

loadRates: function(displayRates){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from rates",
                [],
                function(tx, results){
                    displayRates(results);
                },
                function(tx, error){
                    console.log("Error selecting the rate" + error.message);
                }
            );
        }
    );
},

deleteRate:function(_id){

    console.log("_id");

    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(              
                "DELETE FROM rates WHERE _id = ?",
                [_id],
                function(tx, result){
                    console.log("Delete: " + result.message);
                },
                function(tx, error){
                    console.log("Error delete: " + error.message);
                }
            );
        }
    );
},

updateNote: function(ID, updateNote){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "update rates set rNote = ? where _id = ?",
                [updateNote, ID],
                function(tx, result){},
                function(tx, error){
                    console.log("Error update note " + error.message);
                }
            );
        }
    );
},


findRate: function(value){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "select * from rates where rType like '%value%'",
                [value],
                function(tx,results){},
                function(tx, error){
                    console.log("Error find" + error.message);
                });
        });
},


};
