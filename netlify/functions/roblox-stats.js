const https = require('https');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;

  return new Promise((resolve) => {
    https.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://games.roblox.com/v1/games?universeIds=${id}`)}`, (res) => {
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