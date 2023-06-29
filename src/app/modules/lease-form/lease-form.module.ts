import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeaseFormRoutingModule } from './lease-form-routing.module';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NgIconsModule } from '@ng-icons/core';

import { heroXMark, heroCheck } from '@ng-icons/heroicons/outline';
import { ionLogoWhatsapp } from '@ng-icons/ionicons';

import { LeaseFormComponent } from './pages/lease-form/lease-form.component';
import { RowQuestionsComponent } from './components/row-questions/row-questions.component';
import { LesseeFormComponent } from './pages/lessee-form/lessee-form.component';
import { LessorFormComponent } from './pages/lessor-form/lessor-form.component';
import { InformationLeaseComponent } from './components/information-lease/information-lease.component';
import { InformationPropertyComponent } from './components/information-property/information-property.component';

@NgModule({
  declarations: [
    LeaseFormComponent,
    RowQuestionsComponent,
    LesseeFormComponent,
    LessorFormComponent,
    InformationLeaseComponent,
    InformationPropertyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LeaseFormRoutingModule,

    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    PanelModule,
    TabViewModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,

    NgIconsModule.withIcons({
      heroXMark,
      heroCheck,

      ionLogoWhatsapp,
    }),
  ],
})
export class LeaseFormModule {}
