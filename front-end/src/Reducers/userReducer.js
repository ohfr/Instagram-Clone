import { LOGIN, LOGOUT, LOGIN_START,} from '../Actions/userActions';

const initialState = {
    user_id: '',
    username: '',
    token: '',
    loading: false
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true
            };
        case LOGIN:
            return {
                ...state,
                user_id: action.payload.id,
                username: action.payload.username,
                token: action.payload.token,
                loading: false
            };
        case LOGOUT:
            return {
                ...state,
                user_id: '',
                username: '',
                token: '',
                loading: false
            };
        
        default:
            return state;
    };
};
