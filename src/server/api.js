'use strict';

var ctrl = require('./controller')();

module.exports = function (express) {

    var api = express.Router();

    api.get('/customer', ctrl.customerList);
    api.get('/customer_trans', ctrl.custTransactions);

    api.post('/customer', ctrl.whCustomerList);

    return api;
};