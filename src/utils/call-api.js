import fetch from 'isomorphic-fetch';

const server = 'http://chat-api.simonyan.org';
const version = 'v1';

export default function callApi(endpoint, token, options, data) {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return fetch(`${server}/${version}/${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(data),
    ...options
  })
    .then(response => response.json())
    .then(json => {
      if (!json.success) {
        throw new Error(json.message);
      }
      return json;
    });
}
