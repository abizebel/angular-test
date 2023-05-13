import { createAction, props } from '@ngrx/store';
import { User } from 'src/components/Users/Users.model';

export const loadUsers = createAction(
  '[Users Component] LoadUsers',
  props<{ items: User[] }>()
);
