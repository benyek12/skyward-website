const https = require('https');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;

  // Coba pakai endpoint berbeda
  const options = {
    hostname: 'api.roblox.com',
    path: `/universes/get-universe-contains-place?placeId=${id}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Roblox/WinInet',
      'Accept': 'application/json',
    }
  };

  return new Promise((resolve) => {
    https.get(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', body);
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