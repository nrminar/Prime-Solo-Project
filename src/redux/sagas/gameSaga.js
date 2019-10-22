import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGames() {
    try{
        const response = yield axios.get('/api/game')
        yield put ({ type:'SET_ALL_GAMES', payload: response.data})
    }catch (error){
        console.log('FETCH GAMES ERROR:', error);
    }
}
function* fetchOneGame(action){
    try{
        const response = yield axios.get('/api/game/' + action.payload)
        yield put ({ type: 'SET_GAME', payload: response.data})
    }catch (error) {
        console.log('FETCH ONE GAME ERROR:', error);
    }
}
function* fetchScores(action){
    try{
        const response = yield axios.get('api/score/' + action.payload)
        yield put ({ type: 'SET_SCORES', payload: response.data})
    }catch(error){
        console.log('FETCH SCORES ERROR:', error);
    }
}
function* fetchComments(action){
    try{
        const response = yield axios.get('api/comment/' + action.payload)
        yield put ({ type: 'SET_COMMENTS', payload: response.data})
    }catch(error){
        console.log('FETCH COMMENTS ERROR:', error);
    }
}
function* fetchAllComments(){
    try{
        const response = yield axios.get('api/comment/admin')
        yield put ({ type: 'SET_COMMENTS', payload: response.data})
    }catch(error){
        console.log('FETCH COMMENTS ERROR:', error);
    }
}
function* postComment(action){
    try{
        yield axios.post('/api/comment', action.payload)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
    }catch(error){
        console.log('POST COMMENT ERROR:', error);
    }
}
function* updateComment(action){
    try{
        yield axios.put('api/comment', action.payload)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
    }catch(error){
        console.log('UPDATE COMMENT ERROR:', error);
    }
}
function* adminUpdateComment(action){
    try{
        yield axios.put('api/comment', action.payload)
        yield put({ type: 'FETCH_ALL_COMMENTS'});
    }catch(error){
        console.log('UPDATE COMMENT ERROR:', error);
    }
}
function* deleteComment(action){
    try{
        yield axios.delete('api/comment/' + action.payload.id)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
    }catch(error){
        console.log('DELETE COMMENT ERROR:', error);
    }
}
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
function* addFavorite(action){
    try{
        yield axios.post('api/favorite/' + action.payload)
        yield put({ type: 'FETCH_FAVORITE', payload: action.payload })
    }catch(error){
        console.log('ADD FAVORITE:', error)
    }
}
function* removeFavorite(action){
    try{
        yield axios.delete('api/favorite/' + action.payload)
        yield put({ type: 'FETCH_FAVORITE', payload: action.payload })
    }catch(error){
        console.log('REMOVE FAVORITE', error)
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
}

export default gameSaga;
