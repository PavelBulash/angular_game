import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ResultModalComponent from '../result-modal/result-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export default class GameComponent {
  cells: string[] = Array(100).fill('blue');
  playerScore: number = 0;
  computerScore: number = 0;
  timeLimit: number = 2000;
  gameStarted: boolean = false;
  timer: any;

  constructor(public dialog: MatDialog) {}

  public startGame(): void {
    this.initialSetup();
    this.gameLoop();
  }

  private initialSetup(): void {
    this.playerScore = 0;
    this.computerScore = 0;
    this.cells = Array(100).fill('blue');
    this.gameStarted = true;
  }

  private gameLoop(): void {
    // Check if the game should continue or end
    if (this.playerScore === 10 || this.computerScore === 10) {
      this.openResultModal();
      this.gameStarted = false;
      clearTimeout(this.timer);
      return;
    }

    // Find all available blue cells
    const availableCells = this.cells
      .map((cell, index) => (cell === 'blue' ? index : -1))
      .filter(index => index !== -1);

    if (availableCells.length === 0) {
      this.openResultModal();
      this.gameStarted = false;
      clearTimeout(this.timer);
      return;
    }

    // Set a random cell to yellow and start the timer
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCellIndex = availableCells[randomIndex];
    this.cells[randomCellIndex] = 'yellow';

    this.timer = setTimeout(() => {
      if (this.cells[randomCellIndex] === 'yellow') {
        this.cells[randomCellIndex] = 'red';
        this.computerScore++;
      }
      this.gameLoop();
    }, this.timeLimit);
  }

  public openResultModal(): void {
    const dialogRef = this.dialog.open(ResultModalComponent, {
      data: { playerScore: this.playerScore, computerScore: this.computerScore }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.playerScore = 0;
      this.computerScore = 0;
      this.cells = Array(100).fill('blue');
    });
  }

  public getCellClass(index: number): string {
    return this.cells[index];
  }

  public cellClicked(index: number): void {
    if (this.gameStarted && this.cells[index] === 'yellow') {
      this.cells[index] = 'green';
      this.playerScore++;
    }
  }
}
