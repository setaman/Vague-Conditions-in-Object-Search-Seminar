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

// ////////////////////////////////////////////////////////////
//  Items
// /////////////

/* [
    {price: double},
    {name: string},
   ]
*/
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

router.post('/items', async (req, res, next) => {
    let requests = req.body.map((item) => {

        let generated_item_values = {};
        let generated_item_id = '';

        for (const prop in item) {
            if (isID(prop)) {
                generated_item_id = item[prop];
            } else {
                generated_item_values[prop] = item[prop];
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

router.get('/items', async (req, res) => {
    try {
        let items;
        let items_ids = await client.send(new rqs.ListItems());

        let requests = items_ids.map((id) => {
            return new rqs.GetItemValues(id);
        });

        items = await client.send(new rqs.Batch(requests));
        res.status(200).send(items);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.get('/items/:id', async (req, res) => {
    try {
        let item = await client.send(new rqs.GetItemValues(req.params.id));
        res.status(200).send(item);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/users/properties', async (req, res, next) => {
    let requests = req.body.map((properties_object) => {
        let property;
        for (const prop in properties_object) {
            property = prop;
        }
        return new rqs.AddUserProperty(property, properties_object[property]);
    });
    console.log(requests);
    try {
        await client.send(new rqs.Batch(requests));
        res.status(200).send('User props added!');
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/users/values', async (req, res, next) => {
    let requests = req.body.map((user) => {

        let generated_user_values = {};
        let generated_user_id = '';

        for (const prop in user) {
            if (isID(prop)) {
                generated_user_id = user[prop];
            } else {
                generated_user_values[prop] = user[prop];
            }
        }

        console.log(generated_user_id);
        console.log(generated_user_values);

        return new rqs.SetUserValues(generated_user_id, generated_user_values, {'cascadeCreate': true});
    });
    try {
        await client.send(new rqs.Batch(requests));
        res.status(200).send('User values added!');
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});
// //////////////
//  items
// ////////////////////////////////////////////////////////////


// ////////////////////////////////////////////////////////////
//  INTERACTIONS
// /////////////
router.post('/purchase', async (req, res, next) => {
    try {
        await client.send(new rqs.AddPurchase(req.body.user_id, req.body.item_id, {
            'cascadeCreate': true,
            'amount': req.body.amount,
        }));
        res.status(200).send('User ' + req.body.user_id + ' purchased ' + req.body.item_id);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }

});

router.post('/bookmark', async (req, res, next) => {
    try {
        await client.send(new rqs.AddBookmark(req.body.user_id, req.body.item_id, {'cascadeCreate': true}));
        res.status(200).send('User ' + req.body.user_id + ' bookmarked ' + req.body.item_id);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/view', async (req, res, next) => {
    try {
        await client.send(new rqs.AddDetailView(req.body.user_id, req.body.item_id, { //optional parameters:
            'duration': req.body.duration,
            'cascadeCreate': true,
        }));
        res.status(200).send('User ' + req.body.user_id + ' viewed ' + req.body.item_id);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/rating', async (req, res, next) => {
    let rating = (Number.parseFloat((parseInt(req.body.rating) - 3) / 2).toFixed(2));
    try {
        await client.send(new rqs.AddRating(req.body.user_id, req.body.item_id, rating, {
            'cascadeCreate': true
        }));
        res.status(200).send('User ' + req.body.user_id + ' rated ' + req.body.item_id);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});

router.post('/cart', async (req, res, next) => {
    try {
        await client.send(new rqs.AddCartAddition(req.body.user_id, req.body.item_id, { //optional parameters:
            'cascadeCreate': true,
            'amount': req.body.amount,
        }));
        res.status(200).send('User ' + req.body.user_id + ' added to cart ' + req.body.item_id);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});
// //////////////
//  INTERACTIONS
// ////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////
//  Recommendation
// /////////////

//ITEMS to USER
router.get('/recommendeditems', async (req, res, next) => {
    try {
        let recommended_items = await client.send(new rqs.RecommendItemsToUser(req.params.user, 10, {
            'cascadeCreate': true,
            'returnProperties': true,
    }));
        res.status(200).send(recommended_items.recomms);
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});
// //////////////
//  INTERACTIONS
// ////////////////////////////////////////////////////////////



function isID(prop) {
    return prop.toLowerCase().indexOf('id') > -1;
}

module.exports = router;