$(document).on("ready", function(){
    databaseHandler.createDatabase();
    
});


function add(){
    var rName = $("#rName").val();
    var rType = $("#rType").val();
    var rDate = $("#rDate").val();
    var rPrice = $("#rPrice").val();
    var rService = $("#rService").val();
    var rClean = $("#rClean").val();
    var rQuality = $("#rQuality").val();
    var rNote = $("#rNote").val();
    var rReporter = $("#rReporter").val();
    var error = "errors:\n";

    if(!rName){
        error += "You have not entered data for restaurant name" +"\n";
    }
    if(!rType){
        error += "You have not entered data for restaurant type" +"\n";
    }

    if(!rDate ){
        error += "You have not entered data for date visit" +"\n";
    } 
    if(!rPrice){
        error += "You have not entered data for price of restaurant " +"\n";
    }

    if(!rReporter){
        error += "You have not entered data for reporter name" +"\n";
    } 

    if(error == "errors:\n"){
     var r = confirm("Restaurant name: " + rName +"\n" + "Restaurant type: " + rType + "\n"
        + "Visit date: " + rDate + "\n" + "Avg Price: "+ rPrice + "\n" + "Service rating: "+ rService + "\n"
        + "Cleanliness rating: "+ rClean + "\n" + "Quality food rating:" + rQuality + "\n" + "Note: "+ rNote + "\n" + "Reporter name: "+ rReporter + "\n");
        if(r==true){
            const rate = {
            rName: rName,
            rType: rType,
            rDate: rDate, 
            rPrice: rPrice,
            rService: rService,
            rClean: rClean,
            rQuality: rQuality,
            rNote: rNote,
            rReporter: rReporter
        }
            rateHandler.add(rate);
        } 

    }else{
    alert(error);
    }
}

var currentRate={
    _id: -1,
    rName: "",
    rType: "",
    rDate: "", 
    rPice: "",
    rService: "",
    rClean: "",
    rQuality: "",
    rNotes: "",
    rReporter: ""
};

function displayRates(results){
    var length = results.rows.length;
    var lstRates = $("#lstRates");
    lstRates.empty();
    for(var i = 0; i< length; i++){

        var item = results.rows.item(i);
        console.log("item", item);


        var avgRate = (item.rService + item.rClean + item.rQuality)/3;

        var a = $("<a />");
        var txtID = $("<h3 />").text("ID: ");
        var txtAvgRate = $("<h3 />").text("Average Rate: ");
        var txtName = $("<h3 />").text("Restaurant name: ");
        var txtType = $("<p />").text("Restaurant type: ");
        var txtVisitedDate = $("<p />").text("Visited Date: ");
        var txtPrice = $("<p />").text("Price/Person($): ");
        var txtService = $("<p />").text("Service rating: ");
        var txtCleanliness = $("<p />").text("Cleanliness rating: ");
        var txtFood = $("<p />").text("Food Quality: ");
        var txtNote = $("<p />").text("Notes: ");
        var txtUsername = $("<p />").text("Reporter: ");


        var spanID = $("<span />").text(item._id);
        spanID.attr("name", "_id");
        var spanAvgRate = $("<span />").text(avgRate);
        spanAvgRate.attr("name", "avgRate");
        var spanName = $("<span />").text(item.rName);
        spanName.attr("name", "rName");
        var spanType = $("<span />").text(item.rType);
        spanType.attr("name", "rType");
        var spanVisDate = $("<span />").text(item.rDate);
        spanVisDate.attr("name", "rDate");
        var spanPrice = $("<span />").text(item.rPrice);
        spanPrice.attr("name", "rPrice");
        
        var spanService = $("<span />").text(item.rService);
        spanService.attr("name", "rService");
        var spanCleanliness = $("<span />").text(item.rClean);
        spanCleanliness.attr("name", "rClean");
        var spanFood = $("<span />").text(item.rQuality);
        spanFood.attr("name", "rQuality");
        var spanNote = $("<span />").text(item.rNote);
        spanNote.attr("name", "rNote");
        var spanUsername = $("<span />").text(item.rReporter);
        spanUsername.attr("name", "rReporter");


        txtID.append(spanID);
        txtAvgRate.append(spanAvgRate);

        txtName.append(spanName);
        txtType.append(spanType);
        txtVisitedDate.append(spanVisDate);
        txtPrice.append(spanPrice);
        
        txtService.append(spanService);
        txtCleanliness.append(spanCleanliness);
        txtFood.append(spanFood);
        txtNote.append(spanNote);
        txtUsername.append(spanUsername);
        

        a.append(txtID);
        a.append(txtName);
        a.append(txtAvgRate);
        a.append(txtType);
        a.append(txtVisitedDate);
        a.append(txtPrice);
        a.append(txtService);
        a.append(txtCleanliness);
        a.append(txtFood);
        a.append(txtNote);
        a.append(txtUsername);

        var li = $("<li/>");
        li.attr("data-filtertext", item.rName);
        li.append(a);
        lstRates.append(li);
    }

    lstRates.listview("refresh");
    lstRates.on("tap", "li", function(){
        console.log(currentRate._id);
        currentRate._id = $(this).find("[name='_id']").text();
        currentRate.rName = $(this).find("[name='rName']").text();
        currentRate.rType= $(this).find("[name='rType']").text();
        currentRate.rDate = $(this).find("[name='rDate']").text();
        currentRate.rPrice = $(this).find("[name='rPrice']").text();
        currentRate.rService = $(this).find("[name='rService']").text();
        currentRate.rClean = $(this).find("[name='rClean']").text();
        currentRate.rQuality = $(this).find("[name='rQuality']").text();
        currentRate.rNote = $(this).find("[name='rNote']").text();
        currentRate.rReporter = $(this).find("[name='rReporter']").text();

        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    rateHandler.loadRates(displayRates);
});

function deleteRate(){

    console.log(currentRate._id);

    var r = confirm("Delete Rate\nRate ID: " + currentRate._id + "\n" + "Restaurant name: " + currentRate.rName +"\n" + "Restaurant type: " + currentRate.rType + "\n"
        + "Visit date: " + currentRate.rDate + "\n" + "Price/person: "+ currentRate.rPrice + "\n" + "Service rating: "+ currentRate.rService + "\n"
        + "Cleanliness rating: "+ currentRate.rClean + "\n" + "Quality rating:" + currentRate.rQuality + "\n" + "Note: "+ currentRate.rNote + "\n" + "Reporter Name: "+ currentRate.rReporter + "\n");
    if(r==true){

        rateHandler.deleteRate(currentRate._id);
        rateHandler.loadRates(displayRates);
         // alert("Success");
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updateNoteDialog", function(){
    $("#ID").val(currentRate._id);
    $("#Name").val(currentRate.rName);
    $("#upNote").val(currentRate.rNote);
});

function updateNote(){
    var Id = $("#ID").val();
    var upNote = $("#upNote").val();
    // var Name = $("#Name").val();
    
    console.log(Id);

    var r = confirm("Id: "+ Id + "\n" + "Note: "+ upNote);
    if(r==true){
        rateHandler.updateNote(Id, upNote);
        rateHandler.loadRates(displayRates);
    }
    $("#updateNoteDialog").dialog("close");
    
}
