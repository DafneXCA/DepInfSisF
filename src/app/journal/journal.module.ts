import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJournalsComponent } from './components/view-journals/view-journals.component';
import { EditJournalComponent } from './components/edit-journal/edit-journal.component';
import { AddJournalComponent } from './components/add-journal/add-journal.component';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewJournalsComponent,
    EditJournalComponent,
    AddJournalComponent,
    ModalAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ViewJournalsComponent
  ]
})
export class JournalModule { }
