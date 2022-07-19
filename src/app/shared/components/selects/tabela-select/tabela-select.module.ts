import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaSelectComponent } from './tabela-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TabelaSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ], exports: [
    TabelaSelectComponent
  ]
})
export class TabelaSelectModule { }
