import statsReducer from './statsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    stats: statsReducer
});

export default rootReducer;
