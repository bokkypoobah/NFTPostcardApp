const routes = [{
    path: '/optinoExplorer/:param',
    component: OptinoExplorer,
    name: 'Optinos',
  }, {
    path: '/feedsExplorer/:param',
    component: FeedsExplorer,
    name: 'Feeds',
  }, {
    path: '/tokensExplorer/:param',
    component: TokensExplorer,
    name: 'Tokens',
  }, {
    path: '/governance/:param',
    component: GovernanceExplorer,
    name: 'Governance',
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
