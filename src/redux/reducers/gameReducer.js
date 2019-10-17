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

const scoreReducer = (state = [], action)=>{
  switch(action.type){
    case 'SET_SCORES':
      return action.payload;
    default:
      return state;
  }
}
const commentReducer = (state = [], action)=>{
  switch(action.type){
    case 'SET_COMMENTS':
      return action.payload;
    default:
      return state;
  }
}
  
  export default combineReducers({
    gameReducer,
    allGamesReducer,
    scoreReducer,
    commentReducer,
  });