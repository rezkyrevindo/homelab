import { LOGIN, UPDATE_PROFILE, LOGOUT } from './actions';

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
        case LOGOUT :
            return (
              {...state, data : []},
              {...state, token : 'false'} )
            

        default:
            return state;
    }
  }

export default authReducers; 