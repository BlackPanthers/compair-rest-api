const express = require('express');
const app = express();
const { OperationHelper } = require('apac');
const apiKeys = require('./apikeys');
const helperFunctions = require('./helperFunctions');
var walmart = require('walmart')(apiKeys.walmartApiKey);
const opHelper = new OperationHelper(apiKeys.amazondetails);


app.get('/search/:keyword', (req, res) => {

    opHelper.execute('ItemSearch', {
        'SearchIndex': 'All',
        'Keywords': req.params.keyword,
        'ResponseGroup': 'ItemAttributes,Offers,Images'
    }).then((response) => {
        console.log("Results object: ", response.result);
        var mappedAmzResponse = helperFunctions.mapAmzToCompair(response.result);
        walmart.search(req.params.keyword, "").then((items) => {
            var mappedWalmartResponse = helperFunctions.mapWalmartToCompair(items);
            var mappedRes = mappedWalmartResponse.concat(mappedAmzResponse);
            var sortedMappedRes = mappedRes.sort((a, b) => {
                return parseFloat(a.salePrice) - parseFloat(b.salePrice);
            })

            console.log(sortedMappedRes);
            res.send(sortedMappedRes);
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });
});


app.listen(8080, () => console.log('COMPAIR REST API listening on port 8080!'))
