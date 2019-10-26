const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/',rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "games"`
    pool.query(queryText)
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET GAMES ERROR:', error);
        })
});
router.get(`/:id`,rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "games" WHERE "id" = $1`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET GAMES ERROR:', error);
        })
});


module.exports = router;