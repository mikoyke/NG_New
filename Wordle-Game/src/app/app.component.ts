import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameTableComponent } from './game-table/game-table.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameTableComponent, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Wordle-Game';
}
