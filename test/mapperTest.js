var assert = require('assert');
const mockAmzResponse = require('./mocks/mockAmzResponse');
const mockWalmartResponse = require('./mocks/mockWalmartResponse');
const helperFunctions = require('../helperFunctions');

helperFunctions.mapAmzToCompair(mockAmzResponse);
helperFunctions.mapWalmartToCompair(mockWalmartResponse);

describe('Amazon Mapper Test', function () {
    it('Should return the same number of items in mock element', function () {
        var mappedResponse = helperFunctions.mapAmzToCompair(mockAmzResponse);
        assert.equal(mappedResponse.length, mockAmzResponse.ItemSearchResponse.Items.Item.length);
    });

    it('Should return the same needed elements', function () {
        var mappedResponse = helperFunctions.mapAmzToCompair(mockAmzResponse);
        var amazonItems = mockAmzResponse.ItemSearchResponse.Items.Item;
        assert.equal(amazonItems[0].ItemAttributes.Title, mappedResponse[0].name);
    });
});

describe('Relevance sort test', function () {
    it('Should return the sum of two arrays', function () {
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
       var result = helperFunctions.relevanceSort(testamz,testwm);
       assert.equal(testamz.length + testwm.length , result.length);
    });
    it('Should return the sum of two arrays with different length', function () {
        
        var testamz = helperFunctions.mapAmzToCompair(mockAmzResponse);
        console.log("Length of amazon -" + testamz.length)
        testamz.pop();
        console.log("Length of amazon after pop - " + testamz.length)
        var testwm = helperFunctions.mapWalmartToCompair(mockWalmartResponse);
        console.log("Length of Walmart -  " +testwm.length)
       var result = helperFunctions.relevanceSort(testamz,testwm);
       assert.equal(testamz.length + testwm.length , result.length);
    });
    
});




