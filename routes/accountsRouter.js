const express = require('express');
const accountDb = require('../data/accounts-model.js');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const accounts = await accountDb.find();
        if (!accounts || Object.keys(accounts).length === 0) {
            res.status(400).json({ message: 'Could not find account in database' });
        } else {
            res.status(200).json(accounts);
        }
    } catch (err) {
        res.status(500).json({ err });
    }
});

module.exports = router;