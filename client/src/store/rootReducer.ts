import { combineReducers } from 'redux';
import properties from './properties/reducer';
import navigation from './navigation/reducer';

// add more state slices here
const reducer = combineReducers({ properties, navigation });
export type AppState = ReturnType<typeof reducer>;
export default reducer;
