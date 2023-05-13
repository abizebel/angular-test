import { createReducer, on } from '@ngrx/store';
import { User } from 'src/components/Users/Users.model';
import { loadUsers } from '../actions/users-actions';

const initialState: User[] = [];

export const UsersReducer = createReducer(
  initialState,
  on(loadUsers, (state, { items }) => items)
);
