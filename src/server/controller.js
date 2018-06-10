'use strict';

var db = require('./dbconnection');
var _ = require('underscore');

module.exports = function () {
    var controller = {
        customerList: customerList,
        custTransactions: custTransactions,
        whCustomerList: whCustomerList
    };

    return controller;

    // Implementations

    function customerList(req, res) {
        var sSQL = 'SELECT * FROM customer_info';
        db.query(sSQL, function (err, rows, fields) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            } else {
                res.json(rows);
            }
        });
    }

    function whCustomerList(req, res) {
        var contextParam = req.body.queryResult.parameters;
        var status = (contextParam.hasOwnProperty('status') ? contextParam.status : null);
        var sSQL = 'SELECT * FROM customer_info';
        var filter = null;

        if (status) {
            filter = 'status = \'' + status + '\'';
        }

        if (filter) {
            sSQL += ' WHERE ' + filter;
        }

        db.query(sSQL, function (err, rows, fields) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message,
                    sql: sSQL
                });
            } else {

                var responseTemplate = {
                    tableCard: {
                        title: 'Customers',
                        columnProperties: [
                            {
                                header: 'Name',
                                horizontalAlignment: 'CENTER'
                            },
                            {
                                header: 'Status',
                                horizontalAlignment: 'CENTER'
                            },
                            {
                                header: 'Balance',
                                horizontalAlignment: 'CENTER'
                            },
                            {
                                header: 'Product',
                                horizontalAlignment: 'CENTER'
                            }
                        ],
                        rows: []
                    }
                };

                var row = {
                    cells: []
                };

                _.each(rows, function (item) {
                    row.cells.push(item.Name);
                    row.cells.push(item.Status);
                    row.cells.push(item.Balance);
                    row.cells.push(item.Product);

                    responseTemplate.tableCard.rows.push(_.clone(row));
                    row.cells = [];
                });

                res.json(responseTemplate);
            }
        });
    }

    function custTransactions(req, res) {
        var sSQL = 'select * from customer_info as cust left join transaction as trans on cust.CustomerId = trans.CustomerId';
        var options = {
            sql: sSQL,
            nestTables: true
        };

        db.query(options, function (err, rows, fields) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            } else {
                res.json(rows);
            }
        });
    }
};