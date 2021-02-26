import { LOGIN, UPDATE_PROFILE } from './actions';

const initialState = {
    data : [],
    token : 'false'
  };

function authReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload.token };
        case UPDATE_PROFILE:
            return { ...state, data: action.payload};
        default:
            return state;
    }
  }

export default authReducers; 