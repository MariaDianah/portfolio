import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
    ],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ModalModule
  ],
  exports: [LayoutComponent],
})
export class LayoutModule { }
