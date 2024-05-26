// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// const app = express();
// const port = process.env.PORT || 8080;
//
// app.use('/user', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
// app.use('/problem', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
// app.use('/transaction', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
// app.use('/solver', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
//
// app.listen(port, () => {
//     console.log(`API Gateway is running on port ${port}`);
// });
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = process.env.PORT || 8080;
const proxy = httpProxy.createProxyServer();

// Middleware για logging των αιτημάτων
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
});

app.all('/user*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001' }, (err) => {
        console.error(`Error proxying request for ${req.url}:`, err);
        res.status(500).send('Proxy error');
    });
});

app.all('/problem*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002' }, (err) => {
        console.error(`Error proxying request for ${req.url}:`, err);
        res.status(500).send('Proxy error');
    });
});

app.all('/transaction*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3003' }, (err) => {
        console.error(`Error proxying request for ${req.url}:`, err);
        res.status(500).send('Proxy error');
    });
});

app.all('/solver*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3004' }, (err) => {
        console.error(`Error proxying request for ${req.url}:`, err);
        res.status(500).send('Proxy error');
    });
});

app.listen(port, () => {
    console.log(`API Gateway is running on port ${port}`);
});
