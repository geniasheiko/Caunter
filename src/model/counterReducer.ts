
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

  
  export type SetMinAction = {
    type:'SET_MIN'
    payload: {
       min: number };
    }
  
    export type SetMaxAction = {
      type: "SET_MAX";
      payload: { max: number };
    };
    
    export type SaveValuesAction = {
      type: "SAVE_VALUES";
    };
    
    export type IncrementAction = {
      type: "INCREMENT";
    };
    
    export type ResetAction = {
      type: "RESET";
    };
    export type Actions = SetMinAction | SetMaxAction | SaveValuesAction | IncrementAction | ResetAction;
  
    export const counterReducer = (state = initialState, action: Actions): CounterState => {
    switch (action.type) {
      case SAVE_VALUES:
        return state.error ? state : { ...state, count: state.min, isSet: true };
      case SET_MIN:
        return {
          ...state,
          min: action.payload.min,
        error: action.payload.min < 0 || action.payload.min >= state.max,
        isSet: false,
      };

      case SET_MAX:
        return {
          ...state,
          max: action.payload.max,
        error: state.min < 0 || action.payload.max <= state.min,
        isSet: false,
      };
      case INCREMENT:
        return state.count < state.max ? { ...state, count: state.count + 1 } : state;
      case RESET:
        return { ...state, count: state.min };
      default:
        return state;
    }
  };

  export const setMinAC = (min: number): SetMinAction => ({ type: "SET_MIN", payload: { min } });

export const setMaxAC = (max: number): SetMaxAction => ({ type: "SET_MAX", payload: { max } });

export const saveValuesAC = (): SaveValuesAction => ({ type: "SAVE_VALUES" });

export const incrementAC = (): IncrementAction => ({ type: "INCREMENT" });

export const resetAC = (): ResetAction => ({ type: "RESET" });