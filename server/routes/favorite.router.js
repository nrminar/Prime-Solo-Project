const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let user = req.user.id
    let game = req.params.id
    let queryText = `SELECT * FROM "favorites" WHERE ("user_id" = $1) AND ("game_id" = $2);`;
    pool.query(queryText, [user, game])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET GAMES ERROR:', error);
        })
});
router.post('/:id', (req, res) =>{
    let user = req.user.id
    let game = req.params.id
    let queryText = `INSERT INTO "favorites" ("user_id", "game_id", "favorite") VALUES ($1, $2, TRUE);`;
    pool.query(queryText, [user, game])
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('POST FAVORITE:', error)
        })
});
router.delete('/:id', (req, res) =>{
    let user = req.user.id
    let game = req.params.id
    let queryText = `DELETE FROM "favorites" WHERE ("user_id" = $1) AND ("game_id" = $2);`;
    pool.query(queryText, [user, game])
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            console.log('DELETE FAVORITE:', error)
        })
})

module.exports = router;