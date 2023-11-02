import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})
export default class ResultModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { playerScore: number, computerScore: number }) {}
}
