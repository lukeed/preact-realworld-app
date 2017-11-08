import fetch from 'unfetch';

const API = 'https://conduit.productionready.io/api';

function headers() {
	return {};
}

function handle(r) {
  let act = r.ok ? 'resolve' : 'reject';
  return r.json().then(data => Promise[act](data));
}

function send(method, uri, data, opts) {
  opts = opts || {};
  opts.method = method;
  opts.headers = headers();
  data && (opts.body = JSON.stringify(data));
  return fetch(`${API}/${uri}`, opts).then(handle);
}

export const get = send.bind(null, 'get');
export const put = send.bind(null, 'put');
export const post = send.bind(null, 'post');
export const del = send.bind(null, 'delete');
