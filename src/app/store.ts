import { combineReducers, configureStore} from '@reduxjs/toolkit'
import { counterReducer } from '../model/counterReducer'


const rootReducer = combineReducers({
  counter: counterReducer
  })

  export type AppRootsState = ReturnType<typeof rootReducer>

  export const store = configureStore({
    reducer: rootReducer,
  })
   
 // export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
 