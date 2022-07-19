import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParceiroVendedorSelectComponent } from './parceiro-vendedor-select.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ParceiroVendedorSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ], exports: [
    ParceiroVendedorSelectComponent
  ]
})
export class ParceiroVendedorSelectModule { }
