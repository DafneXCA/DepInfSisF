import { Component,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { pdfValidator } from './Validators/pdfValidator';
import { imageValidator } from './Validators/imageValidator';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {

  public journalForm!: FormGroup;
  public revistaPdf!: File;
  public revistaPortada!: File;

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private journalService:JournalService){

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.journalForm = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      revista:[,[Validators.required,pdfValidator()]],
      portada:[,[Validators.required,imageValidator()]]
    });
  }

  get nombre(){
    return this.journalForm.get('nombre');
  }

  get revista(){
    return this.journalForm.get('revista');
  }

  get portada(){
    return this.journalForm.get('portada');
  }

  Revista(event:any){
    this.revistaPdf=event.target.files[0];
  }

  Portada(event:any){
    this.revistaPortada=event.target.files[0];
  }

  save(){
    
    var journal=this.journalForm.value;
    
    this.journalService.add(journal,this.revistaPdf,this.revistaPortada).subscribe(
      () => {
        alert("Revista registrada exitosamente");
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
