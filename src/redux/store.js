import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['token'] // yg akan di simpan datanya
};

const rootReducer = combineReducers({
    authReducers: persistReducer(persistConfig, authReducers)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
