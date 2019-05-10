const YocoJack=require('./yocojack')
const http=require('https')
const options = {
    host: 'https://s3-eu-west-1.amazonaws.com',
    path: '/yoco-testing/tests.json',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

  http.get(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
    }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        // ...and/or process the entire body here.
    })
});

// console.log(YocoJack.determineWinner(data.playerA,data.playerB,data.playerAWins))