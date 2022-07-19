import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoComponent } from './contrato.component';
import { ContratoRoutingModule } from './contrato-routing.module';



@NgModule({
  declarations: [
    ContratoComponent
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule
  ]
})
export class ContratoModule { }
