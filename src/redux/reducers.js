import { LOGIN, UPDATE_PROFILE, LOGOUT, NOTIF } from './actions';

const initialState = {
    data : [],
    token : 'false',
    notification : 'true',
  };

function authReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload.token };
        case UPDATE_PROFILE:
            return { ...state, data: action.payload};
        case NOTIF:
            return { ...state, notification: action.payload};
        case LOGOUT :
            return (
              {...state, data : []},
              {...state, token : 'false'} )
            

        default:
            return state;
    }
  }

export default authReducers; 