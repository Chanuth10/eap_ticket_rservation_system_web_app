import axios from "axios";
import {
  VIEW_TRAIN_REQUEST,
  VIEW_TRAIN_SUCCESS,
  VIEW_TRAIN_FAIL,
  
  NEW_TRAIN_REQUEST,
  NEW_TRAIN_SUCCESS,
  NEW_TRAIN_FAIL,

  UPDATE_TRAIN_REQUEST,
  UPDATE_TRAIN_SUCCESS,
  UPDATE_TRAIN_FAIL,

  DELETE_TRAIN_REQUEST,
  DELETE_TRAIN_SUCCESS,
  DELETE_TRAIN_FAIL,

  CLEAR_ERRORS,
} from "../constans/TrainConstants";

// Get all trains
export const getAllTrains = () => async (dispatch) => {
  try {
    dispatch({ type: VIEW_TRAIN_REQUEST });
  
    const { data } = await axios.get("/api/v2/admin/trains");
  
    dispatch({
      type: VIEW_TRAIN_SUCCESS,
      payload: data.trains,
    });
  } catch (error) {
    dispatch({
      type: VIEW_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create train
export const createTrain = (trainData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TRAIN_REQUEST });
    console.log(trainData);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/admin/train/new`,
      trainData,
      config
    );
    console.log(data);

    dispatch({
      type: NEW_TRAIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update train
export const updateTrain = (id, trainData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRAIN_REQUEST });
  
    const config = {
      headers: { "Content-Type": "application/json" },
    };
  
    const { data } = await axios.put(
      `/api/v2/admin/train/${id}`,
      trainData,
      config
    );
  
    dispatch({
      type: UPDATE_TRAIN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete train
export const deleteTrain = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRAIN_REQUEST });

    const { data } = await axios.delete(`/api/v2/admin/train/${id}`);

    dispatch({
      type: DELETE_TRAIN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
