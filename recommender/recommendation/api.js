var recombee = require('recombee-api-client');
var rqs = recombee.requests;

const credentials = require('./credentials');

var client = new recombee.ApiClient(credentials.db, credentials.token);
const NUM = 100;

// We will use computers as items in this example
// Computers have four properties
//   - price (floating point number)
//   - number of processor cores (integer number)
//   - description (string)
//   - image (url of computer's photo)

// Add properties of items
client.send(new rqs.Batch([
    new rqs.AddItemProperty('price', 'double'),
    new rqs.AddItemProperty('num-cores', 'int'),
    new rqs.AddItemProperty('description', 'string'),
    new rqs.AddItemProperty('time', 'timestamp'),
    new rqs.AddItemProperty('image', 'image')
]))
    .then((responses) => {
        //Prepare requests for setting a catalog of computers

        var requests = Array.apply(0, Array(NUM)).map((_, i) => {
            return new rqs.SetItemValues(
                `computer-${i}`, //itemId
                //values:
                {
                    'price': 600 + 400 * Math.random(),
                    'num-cores': Math.floor(Math.random() * 8) + 1,
                    'description': 'Great computer',
                    'time': new Date().toISOString(),
                    'image': `http://examplesite.com/products/computer-${i}.jpg`
                },
                //optional parameters:
                {
                    'cascadeCreate': true // Use cascadeCreate for creating item
                    // with given itemId, if it doesn't exist
                }
            );
        });
        //Send catalog to the recommender system
        return client.send(new rqs.Batch(requests));
    })
    .then((responses) => {
        // Generate some random purchases of items by users
        var userIds = Array.apply(0, Array(NUM)).map((_, i) => {
            return `user-${i}`;
        });
        var itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
            return `computer-${i}`;
        });

        // Generate some random purchases of items by users
        const PROBABILITY_PURCHASED = 0.1;
        var purchases = [];
        userIds.forEach((userId) => {
            var purchased = itemIds.filter(() => Math.random() < PROBABILITY_PURCHASED);
            purchased.forEach((itemId) => {
                purchases.push(new rqs.AddPurchase(userId, itemId, {'cascadeCreate': true}))
            });
        });
        // Send purchases to the recommender system
        return client.send(new rqs.Batch(purchases));
    })
    .then((responses) => {
        // Get 5 recommendations for user-42, who is currently viewing computer-6
        return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5));
    })
    .then((recommended) => {
        console.log("Recommended items: %j", recommended);

        // Recommend only computers that have at least 3 cores
        return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5,
            {'filter': "'num-cores'>=3"}
        ));
    })
    .then((recommended) => {
        console.log("Recommended items with at least 3 processor cores: %j", recommended);

        // Recommend only items that are more expensive then currently viewed item (up-sell)
        return client.send(new rqs.RecommendItemsToItem('computer-6', 'user-42', 5,
            {'filter': "'num-cores'>=3"}
        ));
    })
    .then((recommended) => {
        console.log("Recommended up-sell items: %j", recommended)
    })
    .catch((error) => {
        console.error(error);
        // Use fallback
    });