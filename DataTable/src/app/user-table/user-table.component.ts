import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, computed } from '@angular/core';
import { User } from '../interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit {
  users = signal<User[]>([]);
  currentPage = signal(1);
  pageSize = signal(5);
  totalPages = computed(() => {
    return Math.ceil(this.users().length / this.pageSize());
  });
  //pagination
  paginatedUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.users().slice(startIndex, endIndex);
  });
  //sorting
  sortKey = signal<keyof User | null>(null);
  ascending = signal(true);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<User[]>('./assets/users.json').subscribe((users) => {
      this.users.set(users);
    });
  }

  onNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  onPreviousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  onPageSizeChange(sizeNumber: string) {
    const size = +sizeNumber;
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  onSort(key: keyof User) {
    if (this.sortKey() === key) {
      this.ascending.set(!this.ascending());
    } else {
      this.sortKey.set(key);
      this.ascending.set(true);
    }

    const direction = this.ascending() ? 1 : -1;

    this.users.update((users) => {
      return [...users].sort(
        (a, b) => this.compare(a[key], b[key]) * direction
      );
    });
  }

  compare(a: any, b: any) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    return String(a).localeCompare(String(b));
  }
}
