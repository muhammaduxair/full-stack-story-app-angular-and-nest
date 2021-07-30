import { createAction, props } from '@ngrx/store';

export interface UserDataINT {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
}

export const getUserData = createAction('Get User Data');
export const updateUserData = createAction(
  'Update User Data',
  props<UserDataINT>()
);

export interface StoriesINT {
  _id?: string;
  title: string;
  description: string;
  visibility: string;
  user_name: string;
  user_id: string;
  createdAt: string;
}

export const getStories = createAction('Get Stories');
export const setStories = createAction(
  'Set Stories',
  props<{ stories: StoriesINT[] }>()
);
export const deleteStories = createAction(
  'Delete Story',
  props<{ id: string | undefined }>()
);

// private stories

export const getPrivateStories = createAction('Get Private Stories');
export const setPrivateStories = createAction(
  'Set Private Stories',
  props<{ stories: StoriesINT[] }>()
);
export const deletePrivateStories = createAction(
  'Delete Private Story',
  props<{ id: string | undefined }>()
);
