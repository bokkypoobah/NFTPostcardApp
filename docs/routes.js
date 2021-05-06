const routes = [{
    path: '/bodyshop/:param',
    component: Bodyshop,
    name: 'Bodyshop',
  }, {
    path: '/genemixer/:param',
    component: GeneMixer,
    name: 'GeneMixer',
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
