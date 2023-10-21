import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ user: userReducer })

//persistConfig is an object that contains the configuration for redux-persist
//key: the key to use to store the data in localStorage
//storage: the storage adapter to use for storing the data
//version: the version of the state to use for migration purposes
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //not to see error  in devtools when we dont serialize the payload
    }),
})

export const persistor = persistStore(store)