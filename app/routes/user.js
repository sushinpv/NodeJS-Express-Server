const express = require('express');
const router = express.Router();

//importing models
//const user = require('../models/user');

/*
Details: Route is used to get user details
Route: `user`
Method: GET
Parameters: null :Body
Response: Welcome message 
*/
router.get('',(req, res) => {
        res.status(200).json({
            data: {
                message: "Welcome"
            }
        })
});

module.exports = router;