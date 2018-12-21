const express = require('express');
let recombee = require('recombee-api-client');
let rqs = recombee.requests;
let router = express.Router();
const credentials = require('../creds');
const log = require('../logger');

let client = new recombee.ApiClient(credentials.recommbe_db, credentials.recommbe_token);

// ////////////////////////////////////////////////////////////
//  Items
// /////////////

/* [
    {price: double},
    {name: string},
   ]
*/
router.post('/items/properties', async (req, res) => {
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
        return new rqs.SetItemValues(generated_item_id, generated_item_values, {'cascadeCreate': true});
    });
    try {
        await client.send(new rqs.Batch(requests));
        res.status(200).send('Items added!');
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
        items = sanitizeItems(items, items_ids);
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

router.post('/users', async (req, res, next) => {
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
    log.info('rating', rating);
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
//  RECOMMENDATIONS
// /////////////

//ITEMS to USER
router.get('/', async (req, res, next) => {
    try {
        let recommended_items = await client.send(new rqs.RecommendItemsToUser(req.params.user_id, 10, {
            'cascadeCreate': true,
            'returnProperties': true,
        }));
        res.status(200).send(sanitizeRecommendedItems(recommended_items.recomms));
    } catch (e) {
        res.status(500).send('Something is wrong' + e);
    }
});
// //////////////
//  RECOMMENDATIONS
// ////////////////////////////////////////////////////////////

function sanitizeItems(items, items_ids) {
    return items.map((item, index) => {
        item.json.id = items_ids[index];
        return item.json;
    });
}

function sanitizeRecommendedItems(items) {
    return items.map((item) => {
        let id = item.id;
        return {id, ...item.values}
    });
}

function isID(prop) {
    return prop.toLowerCase().indexOf('id') > -1;
}

module.exports = router;