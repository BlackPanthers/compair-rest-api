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