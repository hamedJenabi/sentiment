const https = require('https');

const data = JSON.stringify({
  text: process.argv.splice(2).join(' '),
});
const options = {
  host: 'apidemo.theysay.io',
  path: '/api/v1/sentiment',
  method: 'POST',
  headers: {
    Referer: 'https://apidemo.theysay.io',
    Origin: 'https://apidemo.theysay.io',
    'Content-Type': 'application/json; charset=UTF-8',
    'Content-Length': data.length,
  },
};

const req = https
  .request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    // res.setEncoding('utf8');
    res.on('data', (chunk) => {
      const sentiment = JSON.parse(chunk);
      console.log('QUESTION: ', JSON.parse(data));
      console.log('Overal:', sentiment.sentiment.label);
      console.log('Positive:', '%', sentiment.sentiment.positive * 100);
      console.log('Negative:', '%', sentiment.sentiment.negative * 100);
      console.log('Neutral:', '%', sentiment.sentiment.neutral * 100);
      console.log('Confidence:', '%', sentiment.sentiment.confidence * 100);
    });

    res.on('end', () => {});
  })

  .on('error', (err) => {
    console.log('Error: ', err.message);
  });
req.write(data);
req.end();
