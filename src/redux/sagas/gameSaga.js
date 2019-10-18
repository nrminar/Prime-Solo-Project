import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Axios.get('/api/game').then((response) =>{
//     console.log(response.data)
//     this.setState({games: response.data})
// }).catch((error) =>{
//     console.log('GET GAMES ERROR:', error);
// })

function* fetchGames() {
    try{
        const response = yield axios.get('/api/game', )
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
function* deleteComment(action){
    try{
        yield axios.delete('api/comment/' + action.payload.id)
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.game});
    }catch(error){
        console.log('DELETE COMMENT ERROR:', error);
    }
}
function* gameSaga() {
    yield takeLatest('FETCH_GAMES', fetchGames);
    yield takeLatest('FETCH_ONE_GAME', fetchOneGame);
    yield takeLatest('FETCH_SCORES', fetchScores);
    yield takeLatest('FETCH_COMMENTS', fetchComments);
    yield takeLatest('POST_COMMENT', postComment);
    yield takeLatest('UPDATE_COMMENT', updateComment);
    yield takeLatest('DELETE_COMMENT', deleteComment);
}

export default gameSaga;
