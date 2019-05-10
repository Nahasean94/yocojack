const YocoJack=require('./yocojack')
var requestify = require('requestify');
let responseData
requestify.get('http://s3-eu-west-1.amazonaws.com/yoco-testing/tests.json')
    .then(function(response) {
            // Get the response body (JSON parsed)
        responseData=response.getBody()
console.log('[    WINNER   ]    [ EXPECTED RESULT ]')
        console.log("-----------------------------------")
        responseData.map(data=>{

console.log(YocoJack.determineWinner(data.playerA,data.playerB,data.playerAWins))
        })
        }
    );


