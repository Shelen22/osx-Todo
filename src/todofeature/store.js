import { createStore } from 'redux';
import { reducer } from "./reducer.js";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducer)
  const Reactdev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  export const store = createStore(persistedReducer,{todo:[]},Reactdev)
  export const persistor = persistStore(store)
   

