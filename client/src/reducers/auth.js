import { AUTH, LOGOUT, UPDATE_USER } from '../actions/constants';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      // console.log(action?.data)
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, authData: null };

    case UPDATE_USER:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      // console.log(action?.data)
      return { ...state, authData: action?.data };

    default:
      return state;
  }
};

export default authReducer;
