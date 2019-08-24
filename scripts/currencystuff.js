setInterval(function(){
    updateCurrency()
}, 600000)

function updateCurrency() {
    $.ajax({
        type: "GET",
        url: "https://cors-anywhere.herokuapp.com/api.exchangeratesapi.io/latest?symbols=DKK&base=SEK",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin,X-Requested-With, Content-Type,Accept, Authorization, X-Custom-Header',
            'Access-Control-Allow-Credentials': 'true'
        },
        crossDomain: true,
        success: function (response) {
            if (response == null) {}
            try {
                document.getElementById('exchangeRate').innerHTML = String(response.rates.DKK).substr(0, 5) + " DKK";
            }
            catch (ex) { }
        }
    }); 
}