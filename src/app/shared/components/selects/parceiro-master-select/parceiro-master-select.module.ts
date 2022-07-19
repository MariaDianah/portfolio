import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParceiroMasterSelectComponent } from './parceiro-master-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ParceiroMasterSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ], exports: [
    ParceiroMasterSelectComponent
  ]
})
export class ParceiroMasterSelectModule { }
