import { store } from '../../src/index'

const gameStore = {
    get: function getItemList(){
        return store.getState()
    },
    dis: function dispatchScore(props){
        return store.dispatch({type: 'USER_INFO', payload: {message: props }})
    }
}


export default gameStore;