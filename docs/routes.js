const routes = [{
    path: '/tokensExplorer/:param',
    component: TokensExplorer,
    name: 'Tokens',
  }, {
    path: '/docs/:section/:topic',
    component: Docs,
    name: 'Docs',
  }, {
    path: '*',
    component: Home,
    name: ''
  }
];
