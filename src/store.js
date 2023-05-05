import { combineReducers , legacy_createStore as createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {products , cartItem , profile , address , loginInfo} from "./reducers";

const reducers = combineReducers({products , cartItem , profile ,address , loginInfo});
const middleware = [thunk];
const store =  createStore(reducers,applyMiddleware(...middleware));

export default store;