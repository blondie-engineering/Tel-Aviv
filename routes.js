const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/qldbTransactions', '/qldbTransactions/index')
  .add('qldbTransactions/new', '/qldbTransactions/new')
  .add('/qldbTransactions/:id', '/qldbTransactions/show');


module.exports = routes;
