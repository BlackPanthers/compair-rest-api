

const mapAmzToCompair = (amazonResponse) => {
    var items = amazonResponse.ItemSearchResponse.Items.Item;
    var ret = [];
    items

    for (var index in items) {
        var item = items[index];
        //if list price does not exist
        var price = (item.ItemAttributes.ListPrice == undefined) ? item.OfferSummary.LowestNewPrice.Amount : item.ItemAttributes.ListPrice.Amount;

        //if meduim image does not exist use image set
        var firstImageSet = item.ImageSets.ImageSet[0];
        var smallImage = (item.SmallImage == undefined) ? firstImageSet.SmallImage.URL : item.SmallImage.URL;
        var mediumImage = (item.MediumImage == undefined) ? firstImageSet.MediumImage.URL : item.MediumImage.URL;
        var largeImage = (item.LargeImage == undefined) ? firstImageSet.LargeImage.URL : item.LargeImage.URL;

        var newItem = {
            retailer: 'Amazon',
            ASIN: item.ASIN,
            name: item.ItemAttributes.Title,
            shortDescription: item.ItemAttributes.Feature,
            salePrice: price * 0.01,
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
                productURL: item.productURL,
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



