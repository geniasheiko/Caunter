import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

const SET_MIN = "SET_MIN";
const SET_MAX = "SET_MAX";
const SAVE_VALUES = "SAVE_VALUES";
const INCREMENT = "INCREMENT";
const RESET = "RESET";

type CounterState = {
  count: number;
  min: number;
  max: number;
  error: boolean;
  isSet: boolean;
};

  const initialState: CounterState = {
    count: 0,
    min: 0,
    max: 0,
    error: false,
    isSet: false,
  };

  export const setMinAC = createAction<{ min: number }>(SET_MIN);
export const setMaxAC = createAction<{ max: number }>(SET_MAX);
export const saveValuesAC = createAction(SAVE_VALUES);
export const incrementAC = createAction(INCREMENT);
export const resetAC = createAction(RESET);

  
 export const counterReducer = createReducer(initialState, (builder) => {
      builder
      .addCase(setMinAC,(state, action: PayloadAction<{ min: number }>) => {
        state.min = action.payload.min;
        state.error = action.payload.min < 0 || action.payload.min >= state.max;
        state.isSet = false;
      })
      .addCase(setMaxAC, (state, action: PayloadAction<{ max: number }>) => {
        state.max = action.payload.max;
        state.error = state.min < 0 || action.payload.max <= state.min;
        state.isSet = false;
      })
      .addCase(saveValuesAC, (state) => {
        if (!state.error) {
          state.count = state.min;
          state.isSet = true;
        }
      })
      .addCase(incrementAC, (state) => {
        if (state.count < state.max) {
          state.count += 1;
        }
      })
      .addCase(resetAC, (state) => {
        state.count = state.min;
      });
  });
    
    
    
    
    
    
  