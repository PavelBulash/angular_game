import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import GameComponent from './game/game.component';
import ResultModalComponent from './result-modal/result-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResultModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
