const https = require('https');
const http = require('http');
const got = require('got');

// (async () => {
//   const { body } = await got.post('https://httpbin.org/anything', {
//     json: {
//       hello: 'world',
//     },
//     responseType: 'json',
//   });

//   console.log(body.data);
//   //=>
// })();

// this request will send the header `x-api-key: foo bar`
// (async () => {
//   const { body } = await got.post('https://apidemo.theysay.io', {
//     json: {
//       feeling: 'SAD',
//     },
//     responseType: 'json',
//   });

//   console.log(body.data);
// })();

// This gives 405 error
//**************************
let data = JSON.stringify({
  text: 'Sad sad',
});

const options = {
  host: 'apidemo.theysay.io',
  path: '/api/v1/sentiment',
  method: 'POST',
  headers: {
    Referer: 'https://apidemo.theysay.io',
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https
  .request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Status Code:', res.body);

    res.on(data, (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Body: ', JSON.parse(data));
    });
  })
  .on('error', (err) => {
    console.log('Error: ', err.message);
  });

req.write(data);
req.end();

//*******************************************

// const options = {
//   hostname: 'apidemo.theysay.io',
//   port: 443,
//   path: '/',
//   method: 'POST',
//   // text: 'I am sad',
// };

// const req = https.request(options, (res) => {
//   res.on('data', (d) => {
//     console.log('statusCode:', res.statusCode);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
// await fetch('https://apidemo.theysay.io/', {
//   headers: {
//     accept: 'application/json',
//     'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
//     'content-type': 'application/json',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-origin',
//     'x-requested-with': 'XMLHttpRequest',
//   },
//   referrer: 'https://apidemo.theysay.io/',
//   referrerPolicy: 'no-referrer-when-downgrade',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'include',
// });

// const req = http.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('No more data in response.');
//   });
// });

// req.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`);
// });

// // Write data to request body
// req.write(postData);
// req.end();
// /*
// const data = JSON.stringify({
//   todo: 'I am very sad',
// });a

// const options = {
//   hostname: 'api.theysay.io',
//   port: 443,
//   path: '/',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': 38,
//   },
// };
