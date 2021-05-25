import { LOGIN, UPDATE_PROFILE, LOGOUT, NOTIF , TOPUP, SNAP} from './actions';

const initialState = {
    data : [],
    token : 'false',
    notification : 'true',
    snapToken :'',
    clientKey :'',
    production : '',
    acum_price : '',
    point : '',
    verify_user : '',
  };

function authReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload.token, verify_user : ""+action.payload.verify_user };
        case UPDATE_PROFILE:
            return { ...state, data: action.payload};
        case NOTIF:
            return { ...state, notification: action.payload};
        case TOPUP :
            return { ...state, snapToken : '', clientKey :'', production : '', acum_price : '', point : ''}
        case SNAP : {
            return { ...state, snapToken: action.payload.snap,  clientKey : action.payload.client, production : action.payload.production,
            acum_price : action.payload.acum_price, point : action.payload.point}
        }
        case LOGOUT :
            return (
              {...state, data : []},
              {...state, token : 'false'} )

            

        default:
            return state;
    }
  }

export default authReducers; 