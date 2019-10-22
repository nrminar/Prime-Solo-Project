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
const favoriteReducer = (state = false, action)=>{
  switch(action.type){
    case 'SET_FAVORITE':
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
  favoriteReducer,
});