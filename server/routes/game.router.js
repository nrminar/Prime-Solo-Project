const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "games"`
    pool.query(queryText)
    .then((result) =>{
        res.send(result.rows)
    }).catch((error) =>{
        res.sendStatus(500);
        console.log('GET GAMES ERROR:', error);
    })
});
router.get(`/:id`, (req, res) => {
    let queryText = `SELECT * FROM "games" WHERE "id" = $1`
    pool.query(queryText, [req.params.id])
    .then((result) =>{
        res.send(result.rows)
    }).catch((error) =>{
        res.sendStatus(500);
        console.log('GET GAMES ERROR:', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;