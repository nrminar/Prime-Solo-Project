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
        console.log('FETCH ONE GAME ERROR:', error)
    }
}
function* gameSaga() {
    yield takeLatest('FETCH_GAMES', fetchGames);
    yield takeLatest('FETCH_ONE_GAME', fetchOneGame);
}

export default gameSaga;
