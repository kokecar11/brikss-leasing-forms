import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaseFormComponent } from './pages/lease-form/lease-form.component';
import { LesseeFormComponent } from './pages/lessee-form/lessee-form.component';
import { LessorFormComponent } from './pages/lessor-form/lessor-form.component';

const routes: Routes = [
  {
    path: '',
    component: LeaseFormComponent,
    title: 'Formulario de inventario de Inmuebles Arrendados',
  },
  {
    path: 'entregar/:uuid',
    component: LesseeFormComponent,
    title: 'Inmueble por Entregar',
  },
  {
    path: 'entregado/:uuid',
    component: LesseeFormComponent,
    title: 'Inmueble Entregado',
  },
  {
    path: 'recibir/:uuid',
    component: LessorFormComponent,
    title: 'Inmueble por Recibir',
  },
  {
    path: 'recibido/:uuid',
    component: LessorFormComponent,
    title: 'Inmueble Recibido',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaseFormRoutingModule {}
