import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, InlineSVGModule],
  providers: [SnackbarService],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
