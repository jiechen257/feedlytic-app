## CORS 问题

### 使用 webpack 的 devServer

```ts
modules.export = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use('/api', (req, res, next) => {
        const targetUrl = req.query.url;

        if (!targetUrl) {
          res.status(400).send('url query parameter is required');
          return;
        }

        const proxy = createProxyMiddleware({
          target: targetUrl,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '', // remove /api prefix when sending to target
          },
          onProxyReq: (proxyReq, req, res) => {
            // Optionally, you can add custom headers to the proxied request here
          },
          onProxyRes: (proxyRes, req, res) => {
            // Optionally, you can modify the response from the proxy here
          },
        });

        proxy(req, res, next);
      });

      return middlewares;
    },
  },
}
```
### 使用 electron 的主进程通信

```js
const win = new BrowserWindow();

win.webContents.session.webRequest.onBeforeSendHeaders(
  (details, callback) => {
    callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
  },
);

win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      'Access-Control-Allow-Origin': ['*'],
      ...details.responseHeaders,
    },
  });
});
```
