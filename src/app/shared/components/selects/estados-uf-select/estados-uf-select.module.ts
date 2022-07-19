import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { EstadosUfSelectComponent } from './estados-uf-select.component';

@NgModule({
  declarations: [EstadosUfSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [EstadosUfSelectComponent]
})
export class EstadosUfSelectModule { }
