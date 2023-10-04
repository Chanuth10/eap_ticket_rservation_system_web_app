import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
} from "./reducers/userReducer";

import {
  allTrainsReducer,
  newTrainReducer,
  updateTrainReducer
} from "./reducers/TrainReducer";

const reducer = combineReducers({
  user: userReducer,
  
  allTrains: allTrainsReducer,
  newTrain: newTrainReducer,
  updateTrain: updateTrainReducer
});

let initialState = {};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
