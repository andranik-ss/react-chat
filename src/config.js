const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  API_URI: PROD ? 'https://dogecodes-chat-api.herokuapp.com/' : 'http://localhost:8000',
  API_VERSION: 'v1',
  SOCKETS_URI: PROD ? 'wss://dogecodes-chat-api.herokuapp.com/' : 'ws://localhost:8000/',
};
