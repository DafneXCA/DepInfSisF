import { Component,OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalAddComponent } from '../modal-add/modal-add.component';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.scss']
})
export class AddJournalComponent implements OnInit {

  public modalOptions!: NgbModalOptions;

  constructor(private modalService: NgbModal){
  }

  ngOnInit(): void {
  
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size:'md'
    };
  }


  openModalAdd(){
    const modalRef = this.modalService.open(
      ModalAddComponent,
      this.modalOptions
    );
  }

}
