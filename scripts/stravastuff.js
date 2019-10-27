$(document).ready(function () {
    checkDistance();
});

setInterval(function(){
    checkDistance();
}, 600000)

var e_dist = 0;
var j_dist = 0;

function checkDistance() {
    baseUrl = "https://cors-anywhere.herokuapp.com/https://strava.com/athletes/";
    restUrl = "/profile_sidebar_comparison";

    $.ajax({
        url: baseUrl + "15494864" + restUrl,
        type: "GET",
        dataType: "",
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        success: function(response) {
            var regexp = new RegExp("<tbody id='running-ytd'>\n<tr>\n<td>Distance<\/td>\n<td>(.*?)<\/td>", "g");
            var myVar = regexp.exec(response)[1];

            //e_dist = (Math.round(myVar.slice(0, -3)));
            e_dist = myVar;
            renderDistance();
        }
    });

    $.ajax({
        url: baseUrl + "17629999" + restUrl,
        type: "GET",
        dataType: "",
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        success: function(response) {
            var regexp = new RegExp("<tbody id='running-ytd'>\n<tr>\n<td>Distance<\/td>\n<td>(.*?)<\/td>", "g");
            var myVar = regexp.exec(response)[1];

            j_dist = (Math.round(myVar.slice(0, -3)));
            renderDistance();
        }
    });
}

function renderDistance() {
    jQuery("#strava").empty();

    var j_col = "#FFFFFF";
    var e_col = "#FFFFFF";

    let j_len = j_dist/1.8;
    let e_len = e_dist/1.8;

    if (j_dist > e_dist) {
        j_col = "#F16B51";
    } else {
        e_col = "#F16B51";
    }

    let html = `
    <h3 style="margin-left: 46px;">EDI</h3>
    <div class="distance" style="background-color: ${e_col}; width: ${e_len}px;">
    <p style="color: ${e_col};">${e_dist}</p>
    </div>
    
    <h3>JONAS</h3>
    <div class="distance" style="background-color: ${j_col}; width: ${j_len}px;">
    <p style="color: ${j_col};">${j_dist}</p>
    </div>
    `;

    jQuery("#strava").
    append(html); 
}



// /**
//  * Find the date from the string provided by Strava.
//  * 
//  * @param {string} str The string from Strava.
//  * @returns {objec} The date and weekday.
//  */
// const getDate = str => {
//     switch(str) {
//         case 'Today':
//             return responseFormat(window.moment())
//         case 'Yesterday':
//             return responseFormat(window.moment().subtract(1, 'day'))
//         default:
//             return responseFormat(window.moment(str, 'MMMM DD, YYYY'))
//     }
// }

// /**
//  * The date and the weekday for the given moment instance.
//  * 
//  * @param {moment} momentObj The moment instance to parse.
//  * @returns {object} The date and weekday.
//  */
// const responseFormat = momentObj => ({ date: momentObj.format('DD-MM-YYYY'), weekDay: momentObj.format('dddd') })
