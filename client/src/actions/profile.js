import { AUTH, FETCH_PROFILES, FETCH_PROFILES_BY_USER, UPDATE_PROFILE, DELETE_PROFILE, FETCH_PROFILE_BY_USER, START_LOADING, END_LOADING, FETCH_PROFILE } from './constants';
import * as api from '../api/index.js';

export const getProfile = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.fetchProfile(id);


    dispatch({ type: FETCH_PROFILE, payload: data });
    // dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.response);
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchProfiles();
    dispatch({ type: FETCH_PROFILES, payload: data });
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error);
  }
};


export const getProfilesByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchProfilesByUser(searchQuery)
    dispatch({ type: FETCH_PROFILE_BY_USER, payload: data });

    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response)

  }
}


export const getProfilesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchProfilesBySearch(searchQuery);

    dispatch({ type: FETCH_PROFILES_BY_USER, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};



export const createProfile = (profile, token) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.createProfile(profile);
    // history.push(`/profiles/${data._id}`)

    dispatch({ type: AUTH, data: { result: data, token } });
    window.location.href = '/dashboard'

    // dispatch({ type: END_LOADING })
  } catch (error) {

    if (error.response.status === 404 && error.response.data.message === 'Profile already exist') {

      const searchQuery = { search: profile.userId }
      const { data: { data } } = await api.fetchProfilesByUser(searchQuery);

      dispatch({ type: AUTH, data: { result: data, token } });
      window.location.href = '/dashboard'

    }
  }
};

export const updateProfile = (id, form, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, form);

    dispatch({ type: UPDATE_PROFILE, payload: data });
    openSnackbar("Profile updated successfully")
  } catch (error) {
    console.log(error);
  }
};


export const deleteProfile = (id) => async (dispatch) => {
  try {
    await api.deleteProfile(id);

    dispatch({ type: DELETE_PROFILE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
