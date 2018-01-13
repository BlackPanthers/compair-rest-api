const express = require('express');
const app = express();
const { OperationHelper } = require('apac');
const apiKeys = require('./apikeys');
const helperFunctions = require('./helperFunctions');
var walmart = require('walmart')(apiKeys.walmartApiKey);
const opHelper = new OperationHelper(apiKeys.amazondetails);


app.get('/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    var mappedAmzResponse = [];
    var mappedWalmartResponse = [];

    //make amazon request
    searchAmazon(keyword)
        .then((amazonResponse) => {
            console.log("Results object for amazon: ", amazonResponse.result);
            mappedAmzResponse = helperFunctions.mapAmzToCompair(amazonResponse.result);
            return walmart.search(keyword, "");
        }).then((walmartResponse) => {
            mappedWalmartResponse = helperFunctions.mapWalmartToCompair(walmartResponse);
            var mappedRes = mappedWalmartResponse.concat(mappedAmzResponse);
            var sortedMappedRes = mappedRes.sort((a, b) => {
                return parseFloat(a.salePrice) - parseFloat(b.salePrice);
            })
            var responseObject = {
                items: sortedMappedRes,
            }
            res.send(responseObject);
        })
        .catch((err) => {
            console.error("Something went wrong! ", err);
        });
});

const searchAmazon = (keyword) => {
    return new Promise((resolve, reject) => {
        opHelper.execute('ItemSearch', {
            'SearchIndex': 'All',
            'Keywords': keyword,
            'ResponseGroup': 'ItemAttributes,Offers,Images'
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });

    });
}

app.get('/amazon/:keyword', (req, res) => {
    var amazonResponseStore = {}
    var walmartResponseStore = {}
    searchAmazon(req.params.keyword)
        .then((amazonResponse) => {
            amazonResponseStore = amazonResponse;
            res.send(amazonResponseStore.result);
        })
        .catch();
})



app.listen(8080, () => console.log('COMPAIR REST API listening on port 8080!'))
