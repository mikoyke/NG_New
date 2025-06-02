import { createFeatureSelector } from '@ngrx/store';
import { LoginState } from './state';
import { AppState } from '../../store/app.state';

//method 1: using createFeatureSelector
export const LoginStateSelector = createFeatureSelector<LoginState>('login');

// method 2: directly write callback function
export const counterSelector = (state: AppState) => {
  return state.login.counter;
};
