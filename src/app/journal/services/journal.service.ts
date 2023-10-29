import { Injectable } from '@angular/core';
import { Journal } from 'src/app/Models/journal';
import { JournalDatastoreService } from './journal-datastore.service';

@Injectable({
    providedIn: 'root'
  })
export class JournalService{
    
    constructor(private journalDataStoreService:JournalDatastoreService){}
    
    add(journal:any,pdfRevista:File,imgPortada:File){
        var newJournal = new Journal();
        newJournal.name=journal.nombre;
        newJournal.journal=pdfRevista;
        newJournal.from_page=imgPortada;

        return this.journalDataStoreService.add(newJournal);
    }

    list(){
        return this.journalDataStoreService.list();
    }

    edit(journal:any){
        
        var newJournal=new Journal();
        newJournal.id=journal.id;
        newJournal.name=journal.name;

        console.log(newJournal);
        return this.journalDataStoreService.edit(newJournal);
    }

    delete(id:number){
        return this.journalDataStoreService.delete(id);
    }

    findById(id:number){
        return this.journalDataStoreService.findById(id);
    }

    download(id:number){
        return this.journalDataStoreService.download(id);
    }

}