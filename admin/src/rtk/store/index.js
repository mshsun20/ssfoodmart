import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import counterSlice from '../slices/CounterSlice'
import updtcntSlice from '../slices/UpdtCntSlice'
import cartSlice from '../slices/CartSlice'
import userSlice from '../slices/UserSlice'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  counters: counterSlice,
  updtcnts: updtcntSlice,
  carts: cartSlice,
  users: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    prstreduc: persistedReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

export const persistor = persistStore(store)

