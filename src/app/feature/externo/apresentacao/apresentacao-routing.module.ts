import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApresentacaoComponent } from "./apresentacao.component";

const routes: Routes = [
{
    path: '',
    component: ApresentacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApresentacaoRoutingModule { }
