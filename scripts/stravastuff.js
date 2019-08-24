// $(document).ready(function () {
//     baseUrl = "https://cors-anywhere.herokuapp.com/https://strava.com/athletes/";
//     restUrl = "/profile_sidebar_comparison";

//     $.ajax({
//         url: baseUrl + "15494864" + restUrl,
//         type: "GET",
//         dataType: "",
//         headers: {
//             'x-requested-with': 'XMLHttpRequest',
//         },
//         success: function(response) {
//             var regexp = new RegExp("<tbody id='running-ytd'>\n<tr>\n<td>Distance<\/td>\n<td>(.*?)<\/td>", "g");
//             var myVar = regexp.exec(response)[1];

//             console.log(parseInt(myVar.slice(0, -3)));
//         }
//     });

//     $.ajax({
//         url: baseUrl + "17629999" + restUrl,
//         type: "GET",
//         dataType: "",
//         headers: {
//             'x-requested-with': 'XMLHttpRequest',
//         },
//         success: function(response) {
//             var regexp = new RegExp("<tbody id='running-ytd'>\n<tr>\n<td>Distance<\/td>\n<td>(.*?)<\/td>", "g");
//             var myVar = regexp.exec(response)[1];

//             console.log(parseInt(myVar.slice(0, -3)));
//         }
//     });
// });




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