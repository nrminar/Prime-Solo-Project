const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    let comment = req.body.comment
    let user = req.body.user
    let game = req.body.game
    let query = `INSERT INTO "comments" ("user_id", "game_id", "comment") VALUES ($1, $2, $3);`
    pool.query(query, [user, game, comment])
        .then((result) =>{
        res.send(result.rows);
        console.log('POST COMMENT SUCCESS');
        }).catch((error)=>{
        res.sendStatus(500);
        console.log('POST COMMENT ERROR', error);
        })
});
router.get('/:id', (req, res) =>{
    let query = `SELECT "comments".comment, "user".username FROM "comments" JOIN "user" ON "comments".user_id = "user".id WHERE "game_id" = $1 ORDER BY "comments".id DESC;`
    pool.query(query, [req.params.id])
        .then((result) =>{
        res.send(result.rows);
        console.log('GET COMMENTS SUCCESS', result.rows);
        }).catch((error) =>{
        console.log('GET COMMENTS ERROR:', error);
        })
})

module.exports = router;