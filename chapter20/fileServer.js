const { createServer } = require('http');
const { parse } = require('url');
const { resolve, sep } = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { stat, readdir, rmdir, unlink, mkdir } = require('fs').promises;
const mime = require('mime');

const methods = Object.create(null);

async function notAllowed(req) {
  return {
    status: 405,
    body: `Method ${req.method} not allowed.`,
  };
}

createServer((req, res) => {
  const handler = methods[req.method] || notAllowed;
  handler(req)
    .catch(err => {
      if (err.status !== null) return err;
      return { body: String(err), status: 500 };
    })
    .then(({ body, status = 200, type = 'text/plain' }) => {
      res.writeHead(status, { 'Content-Type': type });
      if (body && body.pipe) body.pipe(res);
      else res.end(body);
    });
}).listen(8000);

const baseDirectory = process.cwd();

function urlPath(url) {
  const { pathname } = parse(url);
  const path = resolve(decodeURIComponent(pathname).slice(1));
  if (path !== baseDirectory && !path.startsWith(baseDirectory + sep)) {
    const err = { status: 403, body: 'Forbidden' };
    throw err;
  }
  return path;
}

methods.GET = async function(req) {
  const path = urlPath(req.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    else return { status: 404, body: 'File not found' };
  }
  if (stats.isDirectory()) {
    return { body: (await readdir(path)).join('\n') };
  }
  return { body: createReadStream(path), type: mime.getType(path) };
};

methods.DELETE = async function(req) {
  const path = urlPath(req.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    else return { status: 204 };
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return { status: 204 };
};

function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on('error', reject);
    to.on('error', reject);
    to.on('finish', resolve);
    from.pipe(to);
  });
}

methods.PUT = async function(req) {
  const path = urlPath(req.url);
  await pipeStream(req, createWriteStream(path));
  return { status: 204 };
};

methods.MKCOL = async function(req) {
  const path = urlPath(req.url);
  try {
    await mkdir(path);
    return { status: 201, body: 'Created' };
  } catch (err) {
    if (err.code === 'EACCES') {
      return {
        status: 403,
        body: 'Forbidden',
      };
    }
    if (err.code === 'EEXIST') {
      return {
        status: 405,
        body: 'Method Not Allowed',
      };
    }
    if (err.code === 'ENOSPC') {
      return {
        status: 507,
        body: 'Insufficient Storage',
      };
    }
    throw err;
  }
};
