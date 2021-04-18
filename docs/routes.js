const routes = [{
    path: '/bodyshop/:param',
    component: Bodyshop,
    name: 'Bodyshop',
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
