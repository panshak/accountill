import { FETCH_PROFILES, CREATE_PROFILE, FETCH_PROFILES_BY_USER, UPDATE_PROFILE, DELETE_PROFILE, FETCH_PROFILE_BY_USER, START_LOADING, END_LOADING, FETCH_PROFILE } from '../actions/constants';

const profilesReducer = (state = { isLoading: true, profiles: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true }
    case END_LOADING:
      return {...state, isLoading: false }
    case FETCH_PROFILES:
      return {
        ...state,
        profiles: action.payload
      }
    case FETCH_PROFILES_BY_USER:
      return { ...state, profiles: action.payload.data };
      
    case FETCH_PROFILE_BY_USER:
      return {...state, profiles: action.payload }
    case FETCH_PROFILE:
      // localStorage.setItem('userProfile', JSON.stringify({...action.payload}))
      return {...state, profile: action.payload }
    
    case CREATE_PROFILE:
      return {...state, profiles: [...state.profiles, action.payload]}
    case UPDATE_PROFILE:
      return {...state, profiles: state.profiles.map((profile) => (profile._id === action.payload._id ? action.payload : profile))}
    case DELETE_PROFILE:
      return {...state, profiles: state.profiles.filter((profile) => profile._id !== action.payload)}
    default:
      return state;
  }
};

export default profilesReducer
