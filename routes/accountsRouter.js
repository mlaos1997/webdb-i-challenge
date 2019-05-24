const express = require('express');
const accountDb = require('../data/accounts-model.js');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const accounts = await accountDb.find();
        if (!accounts || Object.keys(accounts).length === 0) {
            res
                .status(400)
                .json({message: 'Could not find account in database'});
        } else {
            res
                .status(200)
                .json(accounts);
        }
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const account = await accountDb.findById(id);
        if (!account || Object.keys(account).length === 0) {
            return res
                .status(400)
                .json({message: 'Account with given ID not found in database'});
        } else {
            res
                .status(200)
                .json(account);
        }
    } catch (err) {
        res
            .status(500)
            .json({err});
    };
});

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const account = await accountDb.remove(id);
        if (!account || Object.keys(account) === 0) {
            return res
                .status(400)
                .json({message: 'Account with given ID not found in database'})
        } else {
            res
                .status(201)
                .json()
        }
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.post('/', async(req, res) => {
    try {
        const {name, budget} = req.body;
        if (!name || !budget) {
            res
                .status(400)
                .json({message: 'Please provide name and budget for the account'})
        } else {
            const newAccount = await accountDb.add({name, budget});
            res
                .status(201)
                .json({message: 'Account has been added to the database'})
        }
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { name, budget } = req.body;
        if(!name || !budget) {
            res.status(400).json({ message: 'Please provide name and budget for account'});
        } else if (!id) {
            res.status(404).json({ message: 'Account with specified ID does not exist' });
        } else{
            const updatedAccount = await accountDb.update(id, {name, budget});
            res.status(200).json({ message: 'Account has been updated'});
        }
    } catch (err) {
        res.status(500).json({ err });
    }
});


module.exports = router;