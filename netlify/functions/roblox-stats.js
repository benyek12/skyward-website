const https = require('https');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const url = `https://corsproxy.io/?https://games.roblox.com/v1/games?universeIds=${id}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: body
        });
      });
    }).on('error', (err) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
    });
  });
};