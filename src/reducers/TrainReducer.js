import {
    VIEW_TRAIN_REQUEST,
    VIEW_TRAIN_SUCCESS,
    VIEW_TRAIN_FAIL,
  
    NEW_TRAIN_REQUEST,
    NEW_TRAIN_SUCCESS,
    NEW_TRAIN_FAIL,
    NEW_TRAIN_RESET,

    UPDATE_TRAIN_REQUEST,
    UPDATE_TRAIN_SUCCESS,
    UPDATE_TRAIN_FAIL,
    UPDATE_TRAIN_RESET,

    DELETE_TRAIN_REQUEST,
    DELETE_TRAIN_SUCCESS,
    DELETE_TRAIN_FAIL,
    DELETE_TRAIN_RESET,

    CLEAR_ERRORS,
} from "../constans/TrainConstants";
  
// All trains
export const allTrainsReducer = (state = { trains: [] }, action) => {
    switch (action.type) {
    case VIEW_TRAIN_REQUEST:
        return {
            loading: true,
            trains: [],
        };
    case VIEW_TRAIN_SUCCESS:
        return {
            loading: false,
            trains: action.payload,
        };
    case VIEW_TRAIN_FAIL:
        return {
            loading: false,
            error: action.payload,
        };
    case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };
    default:
        return state;
    }
};
  
// New train
export const newTrainReducer = (state = { train: {} }, action) => {
    switch (action.type) {
        case NEW_TRAIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_TRAIN_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                train: action.payload.train,
            };
        case NEW_TRAIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_TRAIN_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
  
// Update / delete train
export const updateTrainReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TRAIN_REQUEST:
        case DELETE_TRAIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_TRAIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_TRAIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
      
        case UPDATE_TRAIN_FAIL:
        case DELETE_TRAIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_TRAIN_RESET:
            return {
                ...state,
                isUpdated: false,
            };        
        case DELETE_TRAIN_RESET:
            return {
                ...state,
                isDeleted: false,
            };
      
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
  