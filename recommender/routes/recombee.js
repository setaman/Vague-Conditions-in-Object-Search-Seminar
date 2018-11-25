const express = require('express');
let recombee = require('recombee-api-client');
let rqs = recombee.requests;
let router = express.Router();
const credentials = require('../creds');

let client = new recombee.ApiClient(credentials.recommbe_db, credentials.recommbe_token);
const NUM = 100;

// We will use computers as items in this example
// Computers have four properties
//   - price (floating point number)
//   - number of processor cores (integer number)
//   - description (string)
//   - image (url of computer's photo)

// Add properties of items

function f() {
    client.send(new rqs.Batch([
        new rqs.AddItemProperty('price', 'double'),
        new rqs.AddItemProperty('num-cores', 'int'),
        new rqs.AddItemProperty('description', 'string'),
        new rqs.AddItemProperty('time', 'timestamp'),
        new rqs.AddItemProperty('image', 'image')
    ]))
        .then((responses) => {
            return 0;
            //Prepare requests for setting a catalog of computers

            let requests = Array.apply(0, Array(NUM)).map((_, i) => {
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
            let userIds = Array.apply(0, Array(NUM)).map((_, i) => {
                return `user-${i}`;
            });
            let itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
                return `computer-${i}`;
            });

            // Generate some random purchases of items by users
            const PROBABILITY_PURCHASED = 0.1;
            let purchases = [];
            userIds.forEach((userId) => {
                let purchased = itemIds.filter(() => Math.random() < PROBABILITY_PURCHASED);
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
}

//[{
// price: double,
//name: string
// }]

/* GET home page. */
router.post('/properties', async (req, res, next) => {
    let requests = req.body.map((properties_object) => {
        let property;
        for (const prop in properties_object) {
            property = prop;
        }
        return new rqs.AddItemProperty(property, properties_object[property]);
    });
    try {
        await client.send(new rqs.Batch(requests));
        res.status(200).send('Props added!');
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/products', async (req, res, next) => {
    let requests = req.body.map((product) => {

        let generated_item_values = {};
        let generated_item_id = '';

        for (const prop in product) {
            if (prop.toLocaleLowerCase() === 'id' || prop.toLocaleLowerCase() === '_id') {
                generated_item_id = product[prop];
            } else {
                generated_item_values[prop] = product[prop];
            }
        }

        console.log(generated_item_id);
        console.log(generated_item_values);

        return new rqs.SetItemValues(generated_item_id, generated_item_values, {'cascadeCreate': true});
    });
    try {
        await client.send(new rqs.Batch(requests));
        res.status(200).send('Products added!');
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

// ////////////////////////////////////////////////////////////
//  INTERACTIONS
// ////////////////////////////////////////////////////////////
router.post('/purchase', async (req, res, next) => {
    client.send(new rqs.AddPurchase(req.body.user_id, req.body.item_id, {
        'cascadeCreate': true,
        'amount': req.body.amount,
    }));
});

router.post('/bookmark', async (req, res, next) => {
    client.send(new rqs.AddBookmark(req.body.user_id, req.body.item_id, {'cascadeCreate': true}));
});

router.post('/view', async (req, res, next) => {
    client.send(new rqs.AddDetailView(req.body.user_id, req.body.item_id, { //optional parameters:
        'duration': req.body.duration,
        'cascadeCreate': true,
    }));
});

router.post('/rating', async (req, res, next) => {
    client.send(new rqs.AddRating(req.body.user_id, req.body.item_id, {'cascadeCreate': true}))
});

router.post('/cart', async (req, res, next) => {
    client.send(new rqs.AddCartAddition(req.body.user_id, req.body.item_id, { //optional parameters:
        'cascadeCreate': true,
        'amount': req.body.amount,
    }))
});

module.exports = router;