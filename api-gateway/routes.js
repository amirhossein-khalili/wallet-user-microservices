const ROUTES = [
  {
    url: '/api/user',
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 15,
    },
    proxy: {
      target: 'http://localhost:8000/api/user',
      changeOrigin: true,
      pathRewrite: {
        '^/api/user': '/api/user',
      },
    },
  },
  {
    url: '/api/wallet',
    auth: false,
    creditCheck: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 15,
    },
    proxy: {
      target: 'http://localhost:7000/api/wallet',
      changeOrigin: true,
      pathRewrite: {
        '^/api/wallet': '/api/wallet',
      },
    },
  },
];

exports.ROUTES = ROUTES;
