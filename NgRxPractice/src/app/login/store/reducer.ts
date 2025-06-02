import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './actions';

export const initialState = 100;
export const counterReducer = createReducer(
  initialState,
  on(increment, (oldState) => {
    return oldState + 1;
  }),
  on(decrement, (oldState) => {
    return oldState - 1;
  }),
  on(reset, () => {
    return 0;
  })
);
