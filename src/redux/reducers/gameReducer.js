import { combineReducers } from 'redux';

const gameReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_GAME':
        return action.payload[0];
      default:
        return state;
    }
  };
const allGamesReducer = (state = [], action)=>{
    switch(action.type){
        case 'SET_ALL_GAMES':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
      }
  };
  
  export default combineReducers({
    gameReducer,
    allGamesReducer,
  });