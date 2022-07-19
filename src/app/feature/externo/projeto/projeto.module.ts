import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetoComponent } from './projeto.component';
import { ProjetoRoutingModule } from './projeto-routing.module';



@NgModule({
  declarations: [
    ProjetoComponent
  ],
  imports: [
    CommonModule,
    ProjetoRoutingModule
  ]
})
export class ProjetoModule { }
