import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { ClientesSelectComponent } from './clientes-select.component';



@NgModule({
  declarations: [
    ClientesSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ], exports: [ClientesSelectComponent]
})
export class ClientesSelectModule { }
