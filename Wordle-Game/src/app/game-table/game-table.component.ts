import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-table',
  imports: [CommonModule],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.scss',
})
export class GameTableComponent implements OnInit {
  table!: { letter: string; state: string }[][];
  currentRow!: number;
  currentCol!: number;
  guessWord!: string;
  targetWord!: string;
  wordslist = [
    'apple',
    'chair',
    'brave',
    'drink',
    'eagle',
    'flame',
    'grape',
    'house',
    'input',
    'joker',
  ];
  gameOver = false;

  keyboard: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
  ];

  ngOnInit(): void {
    this.resetGame();
  }

  @HostListener('window: keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (this.gameOver) return;
    const letter = event.key;
    console.log(letter);

    if (/^[a-zA-Z]$/.test(letter)) {
      if (this.currentCol < 5) {
        this.table[this.currentRow][this.currentCol].letter =
          letter.toUpperCase();
        this.currentCol++;
        console.log(this.currentCol);
      }
    }

    if (letter === 'Backspace') {
      if (this.currentCol > 0) {
        this.currentCol--;
        this.table[this.currentRow][this.currentCol].letter = '';
        console.log(this.currentCol);
      }
    }
    if (letter === 'Enter' && this.currentCol === 5) {
      this.compareWords();
    }
  }

  onClick(key: string) {
    if (this.gameOver) return;
    if (key !== 'ENTER' && key !== 'DELETE') {
      if (this.currentCol < 5) {
        this.table[this.currentRow][this.currentCol].letter = key;
        this.currentCol++;
      }
    } else if (key === 'ENTER' && this.currentCol === 5) {
      this.compareWords();
    } else {
      if (this.currentCol > 0) {
        this.currentCol--;
        this.table[this.currentRow][this.currentCol].letter = '';
      }
    }
  }

  compareWords() {
    this.targetWord = this.targetWord.toUpperCase();
    for (let i = 0; i < this.targetWord.length; i++) {
      const currentLetter = this.table[this.currentRow][i];
      if (this.targetWord[i] === currentLetter.letter) {
        currentLetter.state = 'correct';
      } else if (this.targetWord.includes(currentLetter.letter)) {
        currentLetter.state = 'present';
      } else {
        currentLetter.state = 'wrong';
      }
    }
    if (
      this.table[this.currentRow].every((letter) => letter.state === 'correct')
    ) {
      alert('You Win!');
      this.gameOver = true;
    } else if (this.currentRow < 5) {
      this.currentRow++;
      this.currentCol = 0;
    } else {
      alert('Game Over');
      this.gameOver = true;
    }
  }

  resetGame() {
    this.table = Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: '', state: '' }))
    );
    this.currentRow = 0;
    this.currentCol = 0;
    this.gameOver = false;
    this.guessWord = '';
    const randomIdx = Math.floor(Math.random() * this.wordslist.length);
    this.targetWord = this.wordslist[randomIdx];
  }
}
