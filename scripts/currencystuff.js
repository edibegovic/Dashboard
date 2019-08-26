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

function updateCrypto() {
    $.ajax({
        url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&api_key=7c558a3369eaccfa3ca12ef274745e3a664d8654b536fb72aad26d0b847785ba",
        type: "GET",
        dataType: "",
        headers: {
            'Content-Type': 'text/plain'
          },
        success: function (response) {
            if (response == null) {}
            try {
                // console.log(response.BTC.DKK);
                document.getElementById('bitcoin_price').innerHTML = "B " + parseInt(response.BTC.USD);
                document.getElementById('eth_price').innerHTML = "Ξ " + parseInt(response.ETH.USD);
            }
            catch (ex) { }
        }
    }); 
}