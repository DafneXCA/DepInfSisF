import { Component,Input,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Journal } from 'src/app/Models/journal';
import { JournalService } from '../../services/journal.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.component.html',
  styleUrls: ['./edit-journal.component.scss']
})
export class EditJournalComponent implements OnInit {
  @Input() public id!:number;
  public journalForm!:FormGroup;
  public journal!:Journal;

  constructor(public activeModal:NgbActiveModal,private journalService:JournalService,private formBuilder:FormBuilder){

  }

  ngOnInit(): void {
    this.buildForm();
    this.formEdit();

  }

  buildForm(){
    this.journalForm=this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]]
    });
  }

  formEdit(){
    this.journalService.findById(this.id).subscribe((journal)=>{
     this.journal=journal;
     this.journalForm.patchValue({
      nombre:journal.name
     });
    });
  }

  get nombre(){
    return this.journalForm.get('nombre');
  }

  saveChanges(){
    var journalEdit=this.journalForm.value;
   // console.log(journalEdit.nombre);
    this.journal.name=journalEdit.nombre;
    //console.log(this.journal);
    this.journalService.edit(this.journal).subscribe(
      () => {
        alert("Revista actualizada exitosamente");
        this.closeModal();
        window.location.reload();
      },
      (error: any) => {
        alert(error.error.error.message);
      }
    );
  }

  closeModal():void{
    this.activeModal.close('Modal cerrado con éxito');
  }
}
