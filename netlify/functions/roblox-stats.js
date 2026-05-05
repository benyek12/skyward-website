const https = require('https');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;

  return new Promise((resolve) => {
    const options = {
      hostname: 'games.roblox.com',
      path: `/v1/games?universeIds=${id}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Cookie': ''
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode, 'Body:', body);
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: body
        });
      });
    });

    req.on('error', (err) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
    });

    req.end();
  });
};