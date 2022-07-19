import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { CidadesSelectComponent } from './cidades-select.component';

@NgModule({
  declarations: [CidadesSelectComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [CidadesSelectComponent]
})
export class CidadesSelectModule { }
