import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from './rodape.component';
import { FooterComponent } from './footer/footer.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';



@NgModule({
  declarations: [
    RodapeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ModalModule
  ], exports: [
    RodapeComponent
  ]
})
export class RodapeModule { }

