var Stations = new Array();
var carriges = new Array();

setInterval(function(){
    PreloadBanedanmarkData();
    PreloadTrainStations();
}, 120000)

$(document).ready(function () {
    $.support.cors = true;
    try {
        $.ajaxSetup({
            url: "https://api.trafikinfo.trafikverket.se/v2/data.json",
            error: function (msg) { }
        });
    }
    catch (e) { }

    PreloadBanedanmarkData();
    PreloadTrainStations();
});

function loadTrainData() {
    var xmlRequest = "<REQUEST>" +
                        "<LOGIN authenticationkey='946bf596f113465698c97f6480af325f' />" +
                        "<QUERY objecttype='TrainAnnouncement' " +
                            "orderby='AdvertisedTimeAtLocation' schemaversion='1'>" +
                            "<FILTER>" +
                            "<AND>" +
                                "<OR>" +
                                    "<AND>" +
                                        "<GT name='AdvertisedTimeAtLocation' " +
                                                    "value='$dateadd(-00:15:00)' />" +
                                        "<LT name='AdvertisedTimeAtLocation' " +
                                                    "value='$dateadd(14:00:00)' />" +
                                    "</AND>" +
                                    "<GT name='EstimatedTimeAtLocation' value='$now' />" +
                                "</OR>" +
                                "<EQ name='LocationSignature' value='M' />" +
                                "<EQ name='ActivityType' value='Avgang' />" +
                            "</AND>" +
                            "</FILTER>" +
                            // Just include wanted fields to reduce response size.
                            "<INCLUDE>InformationOwner</INCLUDE>" +
                            "<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>" +
                            "<INCLUDE>EstimatedTimeAtLocation</INCLUDE>" +
                            "<INCLUDE>TrackAtLocation</INCLUDE>" +
                            "<INCLUDE>FromLocation</INCLUDE>" +
                            "<INCLUDE>ToLocation</INCLUDE>" +
                            "<INCLUDE>Canceled</INCLUDE>" +
                            "<INCLUDE>TrainComposition</INCLUDE>" +
                            "<INCLUDE>AdvertisedTrainIdent</INCLUDE>" +
                        "</QUERY>" +
                        "</REQUEST>";
    $.ajax({
        type: "POST",
        contentType: "text/xml",
        dataType: "json",
        data: xmlRequest,
        success: function (response) {
            if (response == null) return;
            if (response.RESPONSE.RESULT[0].TrainAnnouncement == null) return;
            try {
                renderDepartures(response.RESPONSE.RESULT[0].TrainAnnouncement);
            }
            catch (ex) { }
        }
    });
}

function renderDepartures(response) {


    var idx = 0
    $(response).each(function (_, item) {
        var advertisedtime = new Date(item.AdvertisedTimeAtLocation);
        var hours = advertisedtime.getHours()
        var minutes = advertisedtime.getMinutes()
        if (minutes < 10) minutes = "0" + minutes

        var estimatedTimeAtLocation = new Date(item.EstimatedTimeAtLocation);
        var e_hours = estimatedTimeAtLocation.getHours()
        var e_minutes = estimatedTimeAtLocation.getMinutes()
        if (e_minutes < 10) e_minutes = "0" + e_minutes

        var toList = new Array();
        $(item.ToLocation).each(function (iterator, toItem) {
            toList.push(Stations[toItem]);
        });

        var owner = "";
        if (item.InformationOwner != null) owner = item.InformationOwner;
        
        if (item.InformationOwner.includes("Öresundståg") && idx < 9){
            idx++;
            let toLoc = toList.pop();
            let estDepTime = e_hours + ":" + e_minutes;
            let depTime = hours + ":" + minutes;
            let cars = '·'.repeat(parseInt(carriges[item.AdvertisedTrainIdent]));

            var str = "";
            if (estDepTime == "NaN:NaN") {
                estDepTime = "";
            } else {
                str = "style='text-decoration: line-through'";
            }

            if (item.Canceled == 'true') {
                estDepTime = "Aflyst";
                str = "style='text-decoration: line-through'";
            }


            let html = `<div class="departure">
            <p class="to">${toLoc}</p>
            <p class="carriages">${cars}</p>
            <div style="flex-grow: 1"></div>
            <p class="estDepTime">${estDepTime}</p>
            <p class="depTime" ${str}>${depTime}</p>
            </div>
            `;
            
            jQuery(".flex-container").empty();
            jQuery(".flex-container").append(html); 
        }
    });
}

function PreloadBanedanmarkData() {
    $.ajax({
        type: "GET", //rest Type
        dataType: 'json', //mispelled
        url: "https://api.dinstation.dk/api/departure/CPH/",
        contentType: "application/json",
        Accept: "application/json",
        success: function (response) {
            try {
                console.log(response.Trains);
                $(response.Trains).each(function (_, item) {
                    carriges[item.TrainId] = item.Routes.length;
                });
            }
            catch (ex) {}
        }
    });
}

function PreloadTrainStations() {
    // Request to load all stations
    var xmlRequest = "<REQUEST>" +
                        // Use your valid authenticationkey
                        "<LOGIN authenticationkey='946bf596f113465698c97f6480af325f'/>" +
                        "<QUERY objecttype='TrainStation' schemaversion='1'>" +
                            "<FILTER/>" +
                            "<INCLUDE>Prognosticated</INCLUDE>" +
                            "<INCLUDE>AdvertisedLocationName</INCLUDE>" +
                            "<INCLUDE>LocationSignature</INCLUDE>" +
                        "</QUERY>" +
                     "</REQUEST>";
    $.ajax({
        type: "POST",
        contentType: "text/xml",
        dataType: "json",
        data: xmlRequest,
        success: function (response) {
            if (response == null) return;
            try {
                var stationlist = [];
                $(response.RESPONSE.RESULT[0].TrainStation).each(function (iterator, item)
                {
                    Stations[item.LocationSignature] = item.AdvertisedLocationName;
                });
                loadTrainData();
            }
            catch (ex) { }
        }
    });
}