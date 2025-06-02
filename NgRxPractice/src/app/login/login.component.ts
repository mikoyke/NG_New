import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/actions';
import { counterSelector } from './store/selector';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  counter$!: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select(counterSelector);
  }

  increment() {
    this.store.dispatch(increment()); //trigger actions
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
