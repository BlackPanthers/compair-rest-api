const mapAmzToCompair = (amazonResponse) => {
    var items = amazonResponse.ItemSearchResponse.Items.Item;
    var ret = [];
    items

    for (var index in items) {
        var item = items[index];
        //if list price does not exist
        var price = (item.ItemAttributes.ListPrice == undefined) ? item.OfferSummary.LowestNewPrice.Amount : item.ItemAttributes.ListPrice.Amount;

        var smallImage, mediumImage, largeImage;

        //if some form of image exists
        if (item.ImageSet || item.MediumImage) {
            var ImageSet = item.ImageSets.ImageSet;
            var firstImageSet = (ImageSet.constructor === Array) ? ImageSet[0] : ImageSet;
            smallImage = (item.SmallImage == undefined) ? firstImageSet.SmallImage.URL : item.SmallImage.URL;
            mediumImage = ("MediumImage" in item) ? item.MediumImage.URL : firstImageSet.MediumImage.URL;
            largeImage = (item.LargeImage == undefined) ? firstImageSet.LargeImage.URL : item.LargeImage.URL;
        }
        var newItem = {
            retailer: 'Amazon',
            ASIN: item.ASIN,
            name: item.ItemAttributes.Title,
            shortDescription: item.ItemAttributes.Feature,
            salePrice: (price * 0.01).toFixed(2),
            offerSummary: item.OfferSummary,
            offers: item.Offers,
            mediumImage: mediumImage,
            smallImage: smallImage,
            largeImage: largeImage,
            productURL: item.DetailPageURL,
            images: item.ImageSets,
        };

        ret.push(newItem);

    }
    return ret;
}

const mapWalmartToCompair = (walmartResponse) => {
    var ret = [];
    if (walmartResponse.numItems > 0) {
        items = walmartResponse.items;

        for (var index in items) {
            var item = items[index];
            var newItem = {
                retailer: 'Walmart',
                itemId: item.itemId,
                name: item.name,
                shortDescription: item.shortDescription,
                salePrice: item.salePrice,
                mediumImage: item.mediumImage,
                largeImage: item.largeImage,
                productURL: item.productUrl,
                images: item.imageEntities,
            };
            ret.push(newItem);
        }

    }
    return ret;
}





const relevanceSort = (a, b) => {
    const minArray = (a <= b) ? a : b;
    var result = [];


    for (var i = 0; i < minArray.length; i++) {
        if (a[i].salePrice <= b[i].salePrice) {
            result.push(a[i]);
            result.push(b[i]);
        } else {
            result.push(b[i]);
            result.push(a[i]);
        }
    }

    if (a.length != b.length) {
        var maxArray = (a.length === minArray.length) ? b : a;
        result = result.concat(maxArray.slice(minArray.length, maxArray.length + 1))
    }
    return result;
}
module.exports = { mapAmzToCompair, mapWalmartToCompair, relevanceSort };



