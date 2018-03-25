const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  API_URI: PROD ? 'http://chat-api.simonyan.org' : 'http://localhost:8000',
  API_VERSION: 'v1',
  SOCKETS_URI: PROD ? 'ws://chat-api.simonyan.org/' : 'ws://localhost:8000/',
};
