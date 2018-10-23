// Gatekeeper
// https://github.com/prose/gatekeeper

const https = require('https');
const qs = require('querystring');

const auth = (code) => new Promise((resolve, reject) => {
  if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    reject(new Error('A client_id or client_secret was missing from the environment variables'));
  } else {
    const payload = qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    });
  
    let body = '';
    const request = https.request({
      host: 'github.com',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'content-length': payload.length,
      },
    }, (result) => {
      result.setEncoding('utf8');
      result.on('data', (chunk) => {
        body += chunk;
      });
      result.on('end', () => {
        resolve(qs.parse(body).access_token);
      });
    });
  
    request.write(payload);
    request.end();
    request.on('error', (error) => {
      reject(error);
    });
  }
});

exports.handler = (event, context, callback) => {
  const code = event.queryStringParameters.code;
  auth(code)
    .then((result) => {
      if (!result) {
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            ok: false,
            data: null,
          })
        });
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            ok: true,
            data: result,
          })
        });
      }
    })
    .catch((error) => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          data: error.stack,
        })
      });
    });
};
