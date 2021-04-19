const routes = [{
    path: '/tokensExplorer/:param',
    component: TokensExplorer,
    name: 'Tokens',
  }, {
    path: '/docs/:section/:topic',
    component: Docs,
    name: 'Docs',
  }, {
    path: '/:id',
    component: Home,
    name: '',
  }, {
    path: '*',
    component: Home,
    name: ''
  }
];
