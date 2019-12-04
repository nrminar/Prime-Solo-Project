import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fetch all games
function* fetchGames() {
    try{
        const response = yield axios.get('/api/game')
        yield put ({ type:'SET_ALL_GAMES', payload: response.data})
    }catch (error){
        console.log('FETCH GAMES ERROR:', error);
    }
}
//fetch one game, send the id of the game you want
function* fetchOneGame(action){
    try{
        const response = yield axios.get('/api/game/' + action.payload)
        yield put ({ type: 'SET_GAME', payload: response.data})
    }catch (error) {
        console.log('FETCH ONE GAME ERROR:', error);
    }
}
//fetch scores for a game, send the id of the game you want scores for
function* fetchScores(action){
    try{
        const response = yield axios.get('api/score/' + action.payload)
        yield put ({ type: 'SET_SCORES', payload: response.data})
    }catch(error){
        console.log('FETCH SCORES ERROR:', error);
    }
}
//fetch comments for a game, send the id of hte game you want comments for
function* fetchComments(action){
    try{
        const response = yield axios.get('api/comment/' + action.payload)
        yield put ({ type: 'SET_COMMENTS', payload: response.data})
    }catch(error){
        console.log('FETCH COMMENTS ERROR:', error);
    }
}
//fetch all comments for admin moderation
function* fetchAllComments(){
    try{
        const response = yield axios.get('api/comment/admin')
        yield put ({ type: 'SET_COMMENTS', payload: response.data})
    }catch(error){
        console.log('FETCH COMMENTS ERROR:', error);
    }
}
//post a comment, send: { user_id: int, game_id: int, comment: String }
function* postComment(action){
    try{
        yield axios.post('/api/comment', action.payload)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
    }catch(error){
        console.log('POST COMMENT ERROR:', error);
    }
}
//update a comment, send: { commentId: int, comment: String }
function* updateComment(action){
    try{
        yield axios.put('api/comment', action.payload)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
        yield put({ type: 'FETCH_MY_COMMENTS'})
    }catch(error){
        console.log('UPDATE COMMENT ERROR:', error);
    }
}
//allows the admin to update comments, send: { commentId: int, comment: String }
function* adminUpdateComment(action){
    try{
        yield axios.put('api/comment', action.payload)
        yield put({ type: 'FETCH_ALL_COMMENTS'});
    }catch(error){
        console.log('UPDATE COMMENT ERROR:', error);
    }
}
//deletes comments, send: { id: int }
function* deleteComment(action){
    console.log('DELETE COMMENT ACTION:', action)
    try{
        yield axios.delete('api/comment/' + action.payload.id)
        if(action.payload.admin){
            yield put({ type: 'FETCH_ALL_COMMENTS'})
        }else if(action.payload.profile){
            yield put({ type: 'FETCH_MY_COMMENTS'})
        }else{
            yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
        }
    }catch(error){
        console.log('DELETE COMMENT ERROR:', error);
    }
}
//fetch all favorites for a user, send user id
function* fetchFavorite(action){
    try{
        const response = yield axios.get('api/favorite/' + action.payload)
        if(response.data.length > 0){
            yield put({ type: 'SET_FAVORITE', payload: response.data[0].favorite })
        }else{
            yield put({ type: 'SET_FAVORITE', payload: false})
        }
    }catch(error){
        console.log('FETCH FAVORITE ERROR', error)
    }
}
//adds a favorite, send: { game_id: int, user_id: int }
function* addFavorite(action){
    try{
        yield axios.post('api/favorite/' + action.payload)
        yield put({ type: 'FETCH_FAVORITE', payload: action.payload })
    }catch(error){
        console.log('ADD FAVORITE:', error)
    }
}
//removes a favorite, send { user_id: int, game_id: int }
function* removeFavorite(action){
    try{
        yield axios.delete('api/favorite/' + action.payload)
        yield put({ type: 'FETCH_FAVORITE', payload: action.payload })
    }catch(error){
        console.log('REMOVE FAVORITE', error)
    }
}
//remove a game from your favorites, send: { user_id: int, game_id: int }
function* removeMyFavorite(action){
    try{
        yield axios.delete('api/favorite/' + action.payload)
        yield put({ type: 'FETCH_FAV_GAMES', payload: action.payload })
    }catch(error){
        console.log('REMOVE FAVORITE', error)
    }
}
//get all favorites for the logged in user
function* fetchAllFavorites(){
    try{
        const response =  yield axios.get('api/favorite/all')
        yield put({ type: 'SET_FAV_GAMES', payload: response.data})
    }catch(error){
        console.log('FETCH ALL FAVS ERROR:', error)
    }
}
//get all comments for the logged in user
function* fetchMyComments(){
    try{
        const response = yield axios.get('api/comment/mine')
        yield put({ type: 'SET_MY_COMMENTS', payload: response.data})
    }catch(error){
        console.log('FETCH MY COMMENTS ERROR:', error)
    }
}
function* gameSaga() {
    yield takeLatest('FETCH_GAMES', fetchGames);
    yield takeLatest('FETCH_ONE_GAME', fetchOneGame);
    yield takeLatest('FETCH_SCORES', fetchScores);
    yield takeLatest('FETCH_COMMENTS', fetchComments);
    yield takeLatest('FETCH_ALL_COMMENTS', fetchAllComments)
    yield takeLatest('POST_COMMENT', postComment);
    yield takeLatest('UPDATE_COMMENT', updateComment);
    yield takeLatest('ADMIN_UPDATE_COMMENT', adminUpdateComment);
    yield takeLatest('DELETE_COMMENT', deleteComment);
    yield takeLatest('FETCH_FAVORITE', fetchFavorite)
    yield takeLatest('ADD_FAVORITE', addFavorite);
    yield takeLatest('REMOVE_FAVORITE', removeFavorite);
    yield takeLatest('FETCH_FAV_GAMES', fetchAllFavorites);
    yield takeLatest('REMOVE_MY_FAVORITE', removeMyFavorite);
    yield takeLatest('FETCH_MY_COMMENTS', fetchMyComments);
}

export default gameSaga;
