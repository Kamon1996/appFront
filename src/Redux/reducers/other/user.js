import {
  INPUT_CHANGE,
  LOG_OUT,
  SIGN_IN,
  REQUEST_LOG_IN,
  CLEAR_FORM,
} from '../../actions/types';

const initialState = {
  name: '',
  sername: '',
  email: '',
  nickname: '',
  password: '',
  posts: [],
  comments: [],
  isLogged: false,
};

export function user(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOG_IN:
      return state;

    case CLEAR_FORM:
      return {
        ...state,
        name: '',
        sername: '',
        email: '',
        nickname: '',
        password: '',
      };

    case LOG_OUT:
      localStorage.removeItem('access-token');
      localStorage.removeItem('uid');
      return { ...state, isLogged: false };
    case INPUT_CHANGE:
      state[action.keyName] = action.value;
      return { ...state };
    case SIGN_IN:
      return {
        ...state,
        ...action.payload.data.user,
        isLogged: true,
      };
    default:
      return state;
  }
}
