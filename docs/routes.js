const routes = [{
    path: '/workshop/:param',
    component: Workshop,
    name: 'Workshop',
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
