import { Component,OnInit } from '@angular/core'
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EditJournalComponent } from '../edit-journal/edit-journal.component';
import { Journal } from 'src/app/Models/journal';
import { JournalService } from '../../services/journal.service';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-view-journals',
  templateUrl: './view-journals.component.html',
  styleUrls: ['./view-journals.component.scss']
})
export class ViewJournalsComponent implements OnInit {

  public modalOptions!:NgbModalOptions;
  public journals:Journal[]=[];
  public isAuth=false;

  constructor(
    private modalService:NgbModal,
    private journalService:JournalService,
    private authService:AuthService
    ){

  }

  ngOnInit(): void {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size:'md'
    };
    
    this.listJournals();
    this.isAuth=this.authService.isAuthenticated();
  }

  listJournals(){
    /*journals=>{
      journals.forEach(jorunal=>{});
    */
    this.journalService.list().subscribe(journals=>{
      this.journals=journals;
     // console.log(journals);
    });
  }

  openModalEdit(journal:Journal){
    const modalRefEdit=this.modalService.open(
      EditJournalComponent,
      this.modalOptions
    );
    modalRefEdit.componentInstance.id=journal.id;
  }

  deleteJournal(journal:Journal): void{
    const modalDelete=this.modalService.open(ConfirmationModalComponent,this.modalOptions);
    modalDelete.result.then((result)=>{
     
      if(result){
        this.journalService.delete(journal.id??0).subscribe(()=>{
          alert("Eliminado Exitosamente");
          window.location.reload();
        });
      }
      
    });
  }

  download(journal:Journal){
    this.journalService.download(journal.id??0).subscribe(
      (data: Blob) => {
        const enlace = document.createElement('a');
        enlace.href = window.URL.createObjectURL(data);
        enlace.download = journal.name; // Ajusta el nombre del archivo
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
      },
      (error: any) => {
        alert(error.error.error.message);
      }
    );
  }
}
