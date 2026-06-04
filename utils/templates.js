export const openCollectionTemplate = (name) =>
  `
opencollection: 1.0.0

info:
  name: ${name}
  bundled: false
  extensions:
  bruno:
  ignore:
  - node_modules
  - .git`.trim();

export const folderTemplate = (name) =>
  `
info:
  name: ${name}
  type: folder
  seq: 1

request:
  auth: inherit`.trim();

export const requestFileTemplate = (name, method, path) =>
  `
info:
  name: ${name}
  type: http
  seq: 1

http:
  method: ${method}
  url: http://localhost:3000${path}
  auth: inherit

settings:
  encodeUrl: true
  timeout: 0
  followRedirects: true
  maxRedirects: 5`.trim();
