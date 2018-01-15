var assert = require('assert');
const mockAmzResponse = require('./mocks/mockAmzResponse');
const mockWalmartResponse = require('./mocks/mockWalmartResponse');
const helperFunctions = require('../helperFunctions');

describe('Relevance sort test', function () {
    it('Should return the sum of two arrays', function () {
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        var result = helperFunctions.relevanceSort(testamz, testwm);
        assert.equal(testamz.length + testwm.length, result.length);
    });

    it('Should return the sum of two arrays with different length', function () {
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        console.log("Length of amazon -" + testamz.length)
        testamz.pop();
        console.log("Length of amazon after pop - " + testamz.length)
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        console.log("Length of Walmart -  " + testwm.length)
        var result = helperFunctions.relevanceSort(testamz, testwm);
        assert.equal(testamz.length + testwm.length, result.length);
    });


    it('Should return one array if the other one is empty', function () {
        var testamz = [];
        console.log("length of amz after cleared - " + testamz.length)
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        var result = helperFunctions.relevanceSort(testamz, testwm);
        console.log("The result is -" + result.length)
        assert.equal(testamz.length + testwm.length, result.length);
    });

});