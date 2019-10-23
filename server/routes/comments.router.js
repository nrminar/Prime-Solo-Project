const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    let comment = req.body.comment
    let user = req.body.user
    let game = req.body.game
    let query = `INSERT INTO "comments" ("user_id", "game_id", "comment") VALUES ($1, $2, $3);`
    pool.query(query, [user, game, comment])
        .then(() =>{
        res.sendStatus(201);
        console.log('POST COMMENT SUCCESS');
        }).catch((error)=>{
        res.sendStatus(500);
        console.log('POST COMMENT ERROR', error);
        })
});
router.get('/:id', (req, res) =>{
    if(req.params.id === 'admin'){
        let query = 
        `SELECT "comments".*, "user".username, "user".github, "games".name  FROM "comments" 
        JOIN "user" ON "comments".user_id = "user".id 
        JOIN "games" ON "comments".game_id = "games".id 
        ORDER BY "comments".id DESC;`
        pool.query(query)
            .then((result) =>{
            res.send(result.rows);
            console.log('GET ALL COMMENTS SUCCESS', result.rows);
            }).catch((error) =>{
            console.log('GET ALL COMMENTS ERROR:', error);
            })
    }else if(req.params.id === 'mine'){
        let user = req.user.id
        let query = 
        `SELECT "comments".*, "user".username, "user".github, "games".name FROM "comments" 
        JOIN "user" ON "comments".user_id = "user".id 
        JOIN "games" ON "comments".game_id = "games".id 
        WHERE "comments".user_id = $1;`
        pool.query(query, [user])
            .then((result) =>{
            res.send(result.rows);
            console.log('GET ALL COMMENTS SUCCESS', result.rows);
            }).catch((error) =>{
            console.log('GET ALL COMMENTS ERROR:', error);
            })
    }else{
        let query = 
        `SELECT "comments".*, "user".username, "user".github, "games".name FROM "comments" 
        JOIN "user" ON "comments".user_id = "user".id 
        JOIN "games" ON "comments".game_id = "games".id 
        WHERE "game_id" = $1 ORDER BY "comments".id DESC;`
        pool.query(query, [req.params.id])
            .then((result) =>{
            res.send(result.rows);
            console.log('GET COMMENTS SUCCESS', result.rows);
            }).catch((error) =>{
            console.log('GET COMMENTS ERROR:', error);
            })
    }
})
router.put('/', (req, res) =>{
    let comment = req.body.comment
    let id = req.body.id
    let query = `UPDATE "comments" SET "comment" = $1 WHERE "id" = $2;`
    pool.query(query, [comment, id])
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            console.log('UPDATE COMMENT ERROR:', error);
        })
})
router.delete('/:id', (req, res) =>{
    let query = `DELETE FROM "comments" WHERE "id" = $1;`
    pool.query(query, [req.params.id])
        .then(() =>{
            res.sendStatus(200)
            console.log('DELETE COMMENT SUCCESS');
        }).catch((error) =>{
            console.log('DELETE COMMENT ERROR:', error);
        })
})

module.exports = router;