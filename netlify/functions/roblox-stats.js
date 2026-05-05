const https = require('https');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;

  const options = {
    hostname: 'games.roblox.com',
    path: `/v1/games?universeIds=${id}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.roblox.com/',
      'Origin': 'https://www.roblox.com'
    }
  };

  return new Promise((resolve) => {
    https.get(options, (res) => {
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
      resolve({ statusCode: 500, body: 'Error: ' + err.message });
    });
  });
};