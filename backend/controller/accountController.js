'use strict';
require("dotenv").config();
const rateLimiter = require('../middleware/ratelimiter');
const account = require("../model/account");
const express = require("express");
const app = express();
app.use(express.json());
app.use(rateLimiter);

const createAccount = async (req, res, next) => {
    const { user_id, accountNumber, accountBalance } = req.body;
    console.log('creating account')
    try {
        const newAccount = await account.create({
            user_id: user_id,
            accountNumber: accountNumber,
            accountBalance: accountBalance,
            created: Date.now()
        });
        if (newAccount) {
            console.log(newAccount)
            return res.status(200).json({ message: 'Created Account!' });
        } else {
            return res.status(400).send("An error occurred");
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { createAccount };