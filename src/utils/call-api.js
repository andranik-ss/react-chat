import fetch from 'isomorphic-fetch';
import config from '../../config';

export default function callApi(endpoint, token, options, data) {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return fetch(`${config.API_URI}/${config.API_VERSION}/${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(data),
    ...options,
  })
    .then(response => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
      return json;
    });
}
