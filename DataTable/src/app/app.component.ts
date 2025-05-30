import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UserTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DataTable';
}
