setInterval(function(){
    updateCurrency();
    updateCrypto();
}, 600000)

function updateCurrency() {
    $.ajax({
        type: "GET",
        url: "https://api.exchangerate-api.com/v4/latest/SEK",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Content-Type': 'text/plain'
        },
        crossDomain: true,
        success: function (response) {
            if (response == null) {}
            try {
                document.getElementById('exchangeRate').innerHTML = String(response.rates.DKK*100).substring(0, 6) + " DKK";
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
                document.getElementById('bitcoin_price').innerHTML = parseInt(response.BTC.USD) + " DKK";
                document.getElementById('eth_price').innerHTML = parseInt(response.ETH.USD) + " DKK";
            }
            catch (ex) { }
        }
    }); 
}