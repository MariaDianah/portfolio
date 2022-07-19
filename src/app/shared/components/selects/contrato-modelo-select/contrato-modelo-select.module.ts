import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoModeloSelectComponent } from './contrato-modelo-select.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ContratoModeloSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ], exports: [
    ContratoModeloSelectComponent
  ]
})
export class ContratoModeloSelectModule { }
 