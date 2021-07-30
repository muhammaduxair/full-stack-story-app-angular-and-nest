import { createReducer, on } from '@ngrx/store';

import {
  UserDataINT,
  getUserData,
  updateUserData,
  StoriesINT,
  getStories,
  setStories,
  deleteStories,
  setPrivateStories,
  getPrivateStories,
  deletePrivateStories,
} from '../actions/state.actions';

const userInitialState: UserDataINT = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  createdAt: '',
};
const storiesInitialState: StoriesINT[] = [];
const privateStoriesInitialState: StoriesINT[] = [];

export const userDataReducer = createReducer(
  userInitialState,
  on(getUserData, (state) => state),
  on(updateUserData, (state, action) => {
    state = action;
    return state;
  })
);

export const storiesReducer = createReducer(
  storiesInitialState,
  on(getStories, (state) => state),
  on(setStories, (state, action) => {
    state = action.stories;
    return state;
  }),
  on(deleteStories, (state, action) => {
    return state.filter((data) => action.id !== data._id);
  })
);

export const privateStoriesReducer = createReducer(
  privateStoriesInitialState,
  on(getPrivateStories, (state) => state),
  on(setPrivateStories, (state, action) => {
    state = action.stories;
    return state;
  }),
  on(deletePrivateStories, (state, action) => {
    return state.filter((data) => action.id !== data._id);
  })
);
