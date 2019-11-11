import { store } from '../../src/index'

const gameStore = {
    get: function getItemList(){
        return store.getState()
    },
    dis: function dispatchScore(id){
        return store.dispatch({type: 'FETCH_SCORES', payload: id })
    }
}


export default gameStore;