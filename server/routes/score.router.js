const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/',rejectUnauthenticated, (req, res) => {
    let score = req.body.score
    let user = req.body.user
    let game = req.body.game
    let query = `INSERT INTO "scores" ("user_id", "game_id", "score") VALUES ($1, $2, $3);`
    pool.query(query, [user, game, score])
        .then((result) =>{
        res.send(result.rows);
        console.log('POST SCORE SUCCESS');
        }).catch((error)=>{
        res.sendStatus(500);
        console.log('POST SCORE ERROR', error);
        })
});
router.get('/:id', rejectUnauthenticated,(req, res) =>{
    let query = 
    `SELECT "scores".score, "user".username, "user".github FROM "scores" 
    JOIN "user" ON "scores".user_id = "user".id 
    WHERE "game_id" = $1 ORDER BY "score" DESC LIMIT 10;`
    pool.query(query, [req.params.id])
        .then((result) =>{
        res.send(result.rows);
        console.log('GET SCORES SUCCESS', result.rows);
        }).catch((error) =>{
        console.log('GET SCORES ERROR:', error);
        })
})

module.exports = router;